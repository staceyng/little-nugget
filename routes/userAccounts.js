import { generateHash, verifyHash } from "../tools/auth.js";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { DebugLogger, ErrorLogger } from "../tools/logger.js";

const accountsTable = "accounts";
const profileTable = "profiles";

export const getLogin = (req, resp) => {
  resp.status(200).render("login");
};

export const postLogin = (req, resp) => {
  const payload = req.body; // email, password
  const values = [payload.email];
  const q = `
  SELECT DISTINCT password, setup_completed, ${accountsTable}.account_id, ${profileTable}.profile_id 
  FROM ${profileTable} INNER JOIN ${accountsTable} ON ${accountsTable}.account_id = ${profileTable}.account_id
  WHERE email = $1`;

  const unhashedPWInput = payload.password;

  pool
    .query(q, values)
    .then((result) => {
      const data = result.rows;
      let errMsg = "";

      if (data.length > 0) {
        const res = result.rows[0];

        if (!verifyHash(unhashedPWInput, res.password)) {
          errMsg = "invalid login or password";
          ErrorLogger(errMsg);
          resp.status(401).send(errMsg);
        }

        if (!res.setup_completed) {
          errMsg = "first time set up incomplete, redirecting to set up page";
          DebugLogger(errMsg);
          const redirectURL = `/accounts/${res.account_id}/profile/set-up`;
          resp.status(302).redirect(redirectURL);
        }

        const homeURL = `/accounts/${res.account_id}/profile/${res.profile_id}/home`;
        resp.cookie("profile_id", `${res.profile_id}`);
        resp.status(200).redirect(homeURL);
      }
    })
    .catch((err) => DBError(err, req, resp));
};

export const getSignup = (req, resp) => {
  resp.status(200).render("signup");
};

export const postSignup = (req, resp) => {
  const payload = req.body; // email, password, first_name, last_name, account_id, ca, ua
  const hashedPassword = generateHash(payload.password);
  const aid = uuidv4();
  const values = [
    payload.email,
    hashedPassword,
    payload.first_name,
    payload.last_name,
    aid,
  ];
  const q = `
  INSERT INTO ${accountsTable}
  (email, password, first_name, last_name, account_id)
  VALUES 
  ($1, $2, $3, $4, $5)
  `;

  pool
    .query(q, values)
    .then((result) => {
      console.log(
        `succesfully created user account with email: ${payload.email}`
      );
      console.log(result.rows);
      // redirect to setup page
      // const renderObj = { account_id: aid };
      resp.redirect(`/accounts/${aid}/profile/set-up`);
    })
    .catch((err) => DBError(err, req, resp));
};

export const getSetupByAccountId = (req, resp) => {
  const aid = req.params.account_id;
  console.log(aid);
  const renderObj = { account_id: aid };
  resp.status(200).render("setup", renderObj);
};

export const postSetupByAccountId = (req, resp) => {
  const payload = req.body;
  const aid = req.params.account_id;
  const pid = uuidv4();
  console.log(payload);
  const values = [
    pid,
    payload.first_name,
    payload.last_name,
    payload.dob,
    payload.gender,
    aid,
  ];
  const q = `
  INSERT INTO ${profileTable}
  (profile_id, first_name, last_name, date_of_birth, gender, account_id)
  VALUES
  ($1, $2, $3, $4, $5, $6)
  `;
  const q2 = `UPDATE ${accountsTable} SET setup_completed = $1 WHERE account_id = $2`;
  const values2 = [true, aid];

  pool
    .query(q, values)
    .then((result) => {
      console.log(
        `successfully created profile for baby: ${payload.first_name} ${payload.last_name}`
      );
      console.log(result.rows);
      return pool.query(q2, values2);
    })
    .then((result) => {
      console.log(
        `successfully updated account setup completion for account: ${aid}`
      );
      console.log(result.rows);
      const homeURL = `/accounts/${aid}/profile/${pid}/home`;
      resp.status(201).redirect(homeURL);
    })
    .catch((err) => DBError(err, req, resp));
};
