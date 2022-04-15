import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { DebugLogger, ErrorLogger } from "../tools/logger.js";

export const getHomePage = (req, resp) => {
  const profileId = req.cookies.profile_id;
  const values = [profileId];
  const q = `SELECT * FROM profiles WHERE profile_id = $1`;
  pool
    .query(q, values)
    .then((result) => {
      const data = result.rows[0];
      const renderObj = {
        profile_id: profileId,
        account_id: data.account_id,
        first_name: data.first_name,
        last_name: data.last_name,
      };
      resp.status(200).render("home", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};
