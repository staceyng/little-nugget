import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { v4 as uuidv4 } from "uuid";

import { DebugLogger, ErrorLogger } from "../tools/logger.js";
import { datenow, processDateTime } from "../tools/time.js";

const SLEEP_TABLE = "sleep";

export const getSleepPage = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;

  const values = [profileId];
  const q = `SELECT *, 
  TO_CHAR( created_at , 'DD/MM/YYYY, HH:MIPM') as formatted_created_at, 
  TO_CHAR( sleep_start , 'DD/MM/YYYY, HH:MIPM') as formatted_sleep_start, 
  TO_CHAR( sleep_end , 'DD/MM/YYYY, HH:MIPM') as formatted_sleep_end, 
  TO_CHAR( updated_at , 'DD/MM/YYYY, HH:MIPM') as formatted_updated_at 
  FROM ${SLEEP_TABLE} WHERE profile_id = $1 ORDER BY created_at DESC`;
  let renderObj = { profile_id: profileId, account_id: accountId };

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger("querying sleep table for sleep history");

      // process data
      result.rows.forEach((d) => processDateTime(d));
      renderObj["sleep_history"] = result.rows;
      // console.log(result.rows);
      resp.status(200).render("sleep", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};

export const postSleep = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const sleepId = uuidv4();
  const payload = req.body;
  console.log(payload);
  const notes = payload.notes.length === 0 ? "-" : payload.notes;

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

export const getSleepByID = (req, resp) => {
  const sleepId = req.params.sleep_id;
  const accountId = req.params.account_id;
  const profileId = req.params.profile_id;
  let renderObj = { account_id: accountId, profile_id: profileId };

  // GET sleep by sleepID
  const q = `SELECT * FROM ${SLEEP_TABLE} WHERE id = $1 AND profile_id = $2`;
  const values = [sleepId, profileId];

  pool
    .query(q, values)
    .then((result) => {
      const data = result.rows;
      if (data.length < 0) {
        resp.status(404).send("sleep id not found");
      }
      console.log(data);

      const sleep = data[0];
      renderObj["sleep"] = sleep;

      resp.status(200).render("sleep", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};

export const updateSleep = (req, resp) => {
  const sleepId = req.params.sleep_id;
  const accountId = req.params.account_id;
  const profileId = req.params.profile_id;

  const payload = req.body;
  const notes = payload.notes.length === 0 ? "-" : payload.notes;

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
    payload.notes,
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
