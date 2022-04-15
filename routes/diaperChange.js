import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { v4 as uuidv4 } from "uuid";

import { DebugLogger, ErrorLogger } from "../tools/logger.js";
import { datenow, processDateTime } from "../tools/time.js";

const DIAPER_CHANGE_TABLE = "diaper_changes";
const DIAPER_CHANGE_REASON_TABLE = "diaper_change_reasons";
const POOP_SIZE_TABLE = "poop_sizes";

export const getDiaperChangePage = (req, resp) => {
  const accountId = req.params.account_id;
  const profileId = req.params.profile_id;

  const values = [profileId];
  const q = `SELECT *, 
  TO_CHAR( created_at , 'DD/MM/YYYY, HH:MIPM') as formatted_created_at, 
  TO_CHAR( updated_at , 'DD/MM/YYYY, HH:MIPM') as formatted_updated_at 
  FROM ${DIAPER_CHANGE_TABLE} WHERE profile_id = $1 ORDER BY created_at DESC`;
  let renderObj = { profile_id: profileId, account_id: accountId };

  const q2 = `SELECT * from ${POOP_SIZE_TABLE}`;
  const q3 = `SELECT * from ${DIAPER_CHANGE_REASON_TABLE}`;

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger("querying diaper changes table for diaper change history");
      renderObj["diaper_changes"] = result.rows;
      return pool.query(q2).then((result2) => {
        DebugLogger("querying poop_sizes table for poop_sizes");
        const poopSizes = result2.rows.map((d) => d.size);
        renderObj["poop_sizes"] = poopSizes;
        return pool.query(q3).then((result3) => {
          DebugLogger(
            "querying diaper_change_reasons table for diaper change reasons"
          );
          const changeReasons = result3.rows.map((d) => d.reason);
          renderObj["diaper_change_reasons"] = changeReasons;
          resp.status(200).render("diaperChange", renderObj);
        });
      });
    })
    .catch((err) => DBError(err, req, resp));
};

export const postDiaperChange = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const diaperChangeId = uuidv4();
  const payload = req.body;
  console.log(payload);
  const notes = payload.notes.length === 0 ? "-" : payload.notes;
  const poopSize = payload.size.length === 0 ? null : payload.size;

  const q = `
  INSERT INTO ${DIAPER_CHANGE_TABLE} 
  (id, reason, size, notes, profile_id)
  VALUES
  ($1, $2, $3, $4, $5)
  `;
  const values = [diaperChangeId, payload.reason, poopSize, notes, profileId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(
        `successfully created a diaper change entry for ${profileId}`
      );
      console.log(result.rows);
      const diaperChangeURL = `/accounts/${accountId}/profile/${profileId}/diaper-changes`;
      resp.status(201).redirect(diaperChangeURL);
    })
    .catch((err) => DBError(err, req, resp));
};

export const updateDiaperChange = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const diaperChangeId = req.params.diaper_change_id;

  const payload = req.body;
  const poopSize = payload.size.length === 0 ? null : payload.size;
  const notes = payload.notes.length === 0 ? "-" : payload.notes;

  const q = `
  UPDATE ${DIAPER_CHANGE_TABLE} SET
  reason = $1,
  size = $2,
  notes = $3,
  updated_at = $4 WHERE id = $5
  `;
  const values = [payload.reason, poopSize, notes, datenow(), diaperChangeId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(
        `successfully updated diaper change entry with ${diaperChangeId}`
      );
      console.log(result.rows);
      const diaperChangeURL = `/accounts/${accountId}/profile/${profileId}/diaper-changes`;
      resp.status(200).redirect(diaperChangeURL);
    })
    .catch((err) => DBError(err, req, resp));
};

export const deleteDiaperChange = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const diaperChangeId = req.params.diaper_change_id;

  const q = `DELETE FROM ${DIAPER_CHANGE_TABLE} WHERE id = $1`;
  const values = [diaperChangeId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger(
        `successfully deleted diaper change entry with ${diaperChangeId}`
      );
      console.log(result.rows);
      const diaperChangeURL = `/accounts/${accountId}/profile/${profileId}/diaper-changes`;
      resp.status(200).redirect(diaperChangeURL);
    })
    .catch((err) => DBError(err, req, resp));
};
