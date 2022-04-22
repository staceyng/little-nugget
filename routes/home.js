import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { DebugLogger } from "../tools/logger.js";

const PROFILES_TABLE = "profiles";
const ACCOUNTS_TABLE = "accounts";

export const getHomePage = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  let renderObj = { account_id: accountId, profile_id: profileId };

  const q = `SELECT * FROM profiles WHERE account_id = $1`;
  const values = [accountId];

  const q2 = `SELECT *, TO_CHAR( date_of_birth , 'DD/MM/YYYY') as formatted_dob FROM profiles WHERE account_id = $1 AND profile_id = $2`;
  const values2 = [accountId, profileId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger("querying profiles table for baby profiles from account_id");
      const data = result.rows;
      // console.log(data);
      renderObj["baby_profiles"] = data;
      return pool.query(q2, values2);
    })
    .then((result2) => {
      DebugLogger("querying profiles table for current profile");
      const currentProfile = result2.rows[0];
      console.log(result2.rows);
      renderObj["current_profile"] = currentProfile;
      resp.status(200).render("home", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};

export const getBabyProfilePage = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  let renderObj = { account_id: accountId, profile_id: profileId };

  const q = `SELECT *, TO_CHAR( date_of_birth , 'DD/MM/YYYY') as formatted_dob  FROM ${PROFILES_TABLE} WHERE account_id = $1 AND profile_id = $2`;
  const values = [accountId, profileId];

  const q2 = `SELECT * FROM ${ACCOUNTS_TABLE} WHERE account_id = $1`;
  const values2 = [accountId];

  pool
    .query(q, values)
    .then((result) => {
      const profile = result.rows[0];
      renderObj["baby_profile"] = profile;
      return pool.query(q2, values2);
    })
    .then((result2) => {
      const account = result2.rows[0];
      renderObj["account_profile"] = account;
      resp.status(200).render("babyProfile", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};

export const userLogout = (req, resp) => {
  const loginURL = "/login";
  resp.clearCookie("logged_in");
  resp.clearCookie("profile_id");
  resp.redirect(loginURL);
};
