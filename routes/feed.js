import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { v4 as uuidv4 } from "uuid";

import { DebugLogger } from "../tools/logger.js";
import { datenow } from "../tools/datetime.js";

const FEED_TABLE = "feeds";
const FEED_TYPES_TABLE = "feed_types";
const PROFILE_TABLE = "profiles";

export const getFeedPage = (req, resp) => {
  const accountId = req.params.account_id;
  const profileId = req.params.profile_id;

  const values = [profileId];
  const q = `SELECT *, 
  TO_CHAR( created_at , 'DD/MM/YYYY, HH:MIPM') as formatted_created_at, 
  TO_CHAR( updated_at , 'DD/MM/YYYY, HH:MIPM') as formatted_updated_at 
  FROM ${FEED_TABLE} WHERE profile_id = $1 ORDER BY created_at DESC`;
  let renderObj = { profile_id: profileId, account_id: accountId };

  const q2 = `SELECT * from ${FEED_TYPES_TABLE}`;
  const q3 = `SELECT * from ${PROFILE_TABLE} where account_id = $1`;
  const values3 = [accountId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger("querying feeds table for feed history");
      renderObj["feed_history"] = result.rows;
      return pool.query(q2);
    })
    .then((result2) => {
      const feedTypes = result2.rows.map((d) => d.type);
      renderObj["feed_types"] = feedTypes;
      return pool.query(q3, values3);
    })
    .then((result3) => {
      DebugLogger("querying profiles table for baby profiles from account_id");
      const babyProfiles = result3.rows;
      renderObj["baby_profiles"] = babyProfiles;
      resp.status(200).render("feed", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};

export const postFeed = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const feedId = uuidv4();
  const payload = req.body;
  console.log(payload);
  const amt = payload.amount.length === 0 ? 0 : payload.amount;
  const notes = payload.notes.length === 0 ? "" : payload.notes.trim();

  const q = `
  INSERT INTO ${FEED_TABLE} 
  (id, feed_type, amount, notes, profile_id)
  VALUES
  ($1, $2, $3, $4, $5)
  `;
  const values = [feedId, payload.feed_type, amt, notes, profileId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(`successfully created a feed entry for ${profileId}`);
      console.log(result.rows);
      const feedURL = `/accounts/${accountId}/profile/${profileId}/feeds`;
      resp.status(201).redirect(feedURL);
    })
    .catch((err) => DBError(err, req, resp));
};

export const updateFeed = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const feedId = req.params.feed_id;

  const payload = req.body;
  const notes = payload.notes.length === 0 ? "" : payload.notes.trim();

  const q = `
  UPDATE ${FEED_TABLE} SET
  feed_type = $1,
  amount = $2,
  notes = $3,
  updated_at = $4 WHERE id = $5
  `;
  const values = [payload.feed_type, payload.amount, notes, datenow(), feedId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(`successfully updated feed entry with ${feedId}`);
      console.log(result.rows);
      const feedURL = `/accounts/${accountId}/profile/${profileId}/feeds`;
      resp.status(200).redirect(feedURL);
    })
    .catch((err) => DBError(err, req, resp));
};

export const deleteFeed = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const feedId = req.params.feed_id;

  const q = `DELETE FROM ${FEED_TABLE} WHERE id = $1`;
  const values = [feedId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(`successfully deleted feed entry with ${feedId}`);
      console.log(result.rows);
      const feedURL = `/accounts/${accountId}/profile/${profileId}/feeds`;
      resp.status(200).redirect(feedURL);
    })
    .catch((err) => DBError(err, req, resp));
};
