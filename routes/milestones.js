import { pool } from "../db/db.js";
import { DBError } from "../tools/errors.js";
import { v4 as uuidv4 } from "uuid";

import { DebugLogger } from "../tools/logger.js";
import { datenow, WeeksBetween, DaysBetween } from "../tools/datetime.js";

const MILESTONES_LIST_TABLE = "milestones_list";
const MILESTONES_TABLE = "milestones";
const PROFILE_TABLE = "profiles";

export const getMilestonesPage = (req, resp) => {
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  let renderObj = { profile_id: profileId, account_id: accountId };

  const q = `SELECT date_of_birth FROM ${PROFILE_TABLE} WHERE profile_id = $1 AND account_id = $2`;
  const values = [profileId, accountId];
  const q4 = `SELECT * FROM ${PROFILE_TABLE} WHERE account_id = $1`;
  const values4 = [accountId];

  pool
    .query(q, values)
    .then((result) => {
      DebugLogger("querying profiles table for dob");
      let week = 1;
      if (result.rows.length === 0) {
        DBError("no profile found");
        return;
      }
      const dob = result.rows[0];
      renderObj["dob"] = dob.date_of_birth;
      const now = datenow();
      week = WeeksBetween(now, dob.date_of_birth);
      const days = DaysBetween(now, dob.date_of_birth);
      const leftDays = days - 7 * week;
      DebugLogger(`week: ${week}`);
      renderObj["age"] = `${week} week ${leftDays} days`;

      const q2 = `SELECT * from ${MILESTONES_LIST_TABLE} WHERE week BETWEEN $1 and $2`;
      const values2 = [week, week + 2];

      return pool.query(q2, values2);
    })
    .then((result2) => {
      const data = result2.rows;
      let upcomingMilestones = {};
      const upcomingMilestoneIDs = data.map((d) => d.milestone_id);
      data.forEach((d) => {
        const key = d.tag;
        if (d.tag in upcomingMilestones) {
          // update existing array
          upcomingMilestones[d.tag].push({
            week: d.week,
            milestone_id: d.milestone_id,
            description: d.milestone_description,
          });
        } else {
          upcomingMilestones[d.tag] = [
            {
              week: d.week,
              milestone_id: d.milestone_id,
              description: d.milestone_description,
            },
          ];
        }
      });
      console.log(upcomingMilestones);
      renderObj["upcoming_milestones"] = upcomingMilestones;
      renderObj["upcoming_milestones_id"] = upcomingMilestoneIDs;

      const q3 = `
        SELECT *,
        TO_CHAR( completed_at , 'DD/MM/YYYY, HH:MIPM') as formatted_completed_at 
        FROM ${MILESTONES_TABLE} FULL OUTER JOIN ${MILESTONES_LIST_TABLE} 
        ON ${MILESTONES_TABLE}.milestone_id = ${MILESTONES_LIST_TABLE}.milestone_id 
        WHERE completed = $1 AND profile_id = $2
      `;
      const values3 = [true, profileId];
      return pool.query(q3, values3);
    })
    .then((result3) => {
      const completedMilestones = result3.rows;
      console.log(completedMilestones);
      const completedMilestonesId = completedMilestones.map(
        (d) => d.milestone_id
      );

      console.log(completedMilestonesId);
      renderObj["completed_milestones_id"] = completedMilestonesId;
      renderObj["completed_milestones"] = completedMilestones;
      console.log(renderObj);
      return pool.query(q4, values4);
    })
    .then((result4) => {
      DebugLogger("querying profiles table for baby profiles from account_id");
      const babyProfiles = result4.rows;
      renderObj["baby_profiles"] = babyProfiles;
      resp.status(200).render("milestones", renderObj);
    })
    .catch((err) => DBError(err, req, resp));
};

export const postMilestone = (req, resp) => {
  console.log("postmiletsone called");
  console.log(req.body);
  const profileId = req.params.profile_id;
  const accountId = req.params.account_id;
  const payload = req.body;

  const milestoneId = payload.milestone_id.toString();
  const completed = payload.checked;
  const q = `
  INSERT INTO ${MILESTONES_TABLE} 
  (id, completed, completed_at, milestone_id, profile_id)
  VALUES ($1, $2, $3, $4, $5)`;
  const values = [uuidv4(), completed, datenow(), milestoneId, profileId];

  pool.query(q, values).then((result) => {
    DebugLogger(
      `successfully added completed milestones for profile ${profileId}`
    );
    const data = result.rows;
    console.log(data);
    const milestonesURL = `/accounts/${accountId}/profile/${profileId}/milestones`;
    resp.status(200).redirect(milestonesURL);
  });
};
