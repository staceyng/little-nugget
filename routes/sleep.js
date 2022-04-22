import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { v4 as uuidv4 } from "uuid";

import { DebugLogger } from "../tools/logger.js";
import { datenow, processDateTime } from "../tools/datetime.js";

const SLEEP_TABLE = "sleep";
const PROFILE_TABLE = "profiles";

export const getSleepPage = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  let renderObj = { profile_id: profileId, account_id: accountId };

  const q = `SELECT *, 
  TO_CHAR( created_at , 'DD/MM/YYYY, HH:MIPM') as formatted_created_at, 
  TO_CHAR( sleep_start , 'DD/MM/YYYY, HH:MIPM') as formatted_sleep_start, 
  TO_CHAR( sleep_end , 'DD/MM/YYYY, HH:MIPM') as formatted_sleep_end, 
  TO_CHAR( updated_at , 'DD/MM/YYYY, HH:MIPM') as formatted_updated_at 
  FROM ${SLEEP_TABLE} WHERE profile_id = $1 ORDER BY created_at DESC`;
  const values = [profileId];

  const q2 = `SELECT * from ${PROFILE_TABLE} where account_id = $1`;
  const values2 = [accountId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger("querying sleep table for sleep history");
      // process data
      const sleepHistory = result.rows;
      sleepHistory.forEach((d) => processDateTime(d));
      renderObj["sleep_history"] = sleepHistory;

      return pool.query(q2, values2);
    })
    .then((result2) => {
      DebugLogger("querying profiles table for baby profiles from account_id");
      const babyProfiles = result2.rows;
      renderObj["baby_profiles"] = babyProfiles;

      resp.status(200).render("sleep", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};

export const postSleep = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const sleepId = uuidv4();
  const payload = req.body;
  const notes = payload.notes.length === 0 ? "" : payload.notes.trim();

  const values = [
    sleepId,
    payload.duration,
    notes,
    payload.sleep_start,
    payload.sleep_end,
    profileId,
  ];
  const q = `
  INSERT INTO ${SLEEP_TABLE} 
  (id, duration, notes, sleep_start, sleep_end, profile_id)
  VALUES
  ($1, $2, $3, $4, $5, $6)
  `;

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(
        `successfully created a sleep entry for profile ${profileId}`
      );
      console.log(result.rows);
      const sleepURL = `/accounts/${accountId}/profile/${profileId}/sleep`;
      resp.status(201).redirect(sleepURL);
    })
    .catch((err) => DBError(err, req, resp));
};

export const updateSleep = (req, resp) => {
  const sleepId = req.params.sleep_id;
  const accountId = req.params.account_id;
  const profileId = req.params.profile_id;

  const payload = req.body;
  const notes = payload.notes.length === 0 ? "" : payload.notes.trim();

  // UPDATE sleep by sleepID
  const q = `
  UPDATE ${SLEEP_TABLE} SET 
  duration = $1, 
  notes = $2, 
  sleep_start = $3,
  sleep_end = $4,
  updated_at = $5 WHERE id = $6
  `;
  const values = [
    payload.duration,
    notes,
    payload.sleep_start,
    payload.sleep_end,
    datenow(),
    sleepId,
  ];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(`successfully updated sleep entry with ${sleepId}`);
      console.log(result.rows);
      const sleepURL = `/accounts/${accountId}/profile/${profileId}/sleep`;
      resp.status(200).redirect(sleepURL);
    })
    .catch((err) => DBError(err, req, resp));
};

export const deleteSleep = (req, resp) => {
  const sleepId = req.params.sleep_id;
  const accountId = req.params.account_id;
  const profileId = req.params.profile_id;

  const q = `DELETE FROM ${SLEEP_TABLE} WHERE id = $1`;
  const values = [sleepId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(`successfully deleted sleep entry with ${sleepId}`);
      console.log(result.rows);
      const sleepURL = `/accounts/${accountId}/profile/${profileId}/sleep`;
      resp.status(200).redirect(sleepURL);
    })
    .catch((err) => DBError(err, req, resp));
};
