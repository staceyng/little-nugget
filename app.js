import express from "express";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import {
  getLogin,
  postLogin,
  getSetupByAccountId,
  getSignup,
  postSetupByAccountId,
  postSignup,
  getSetupProfiles,
} from "./routes/userAccounts.js";
import { getHomePage, userLogout, getBabyProfilePage } from "./routes/home.js";
import {
  getSleepPage,
  postSleep,
  deleteSleep,
  updateSleep,
} from "./routes/sleep.js";
import {
  getFeedPage,
  postFeed,
  updateFeed,
  deleteFeed,
} from "./routes/feed.js";
import {
  deleteDiaperChange,
  getDiaperChangePage,
  postDiaperChange,
  updateDiaperChange,
} from "./routes/diaperChange.js";
import { getMilestonesPage, postMilestone } from "./routes/milestones.js";

const PORT = 3004;
const app = express();
const router = express.Router();

// routers for login accounts and user profiles
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/accounts/sign-up", getSignup);
router.post("/accounts/sign-up", postSignup);

router.get("/accounts/:account_id/profile/set-up", getSetupByAccountId);
router.post("/accounts/:account_id/profile/set-up", postSetupByAccountId);
router.get("/accounts/:account_id/profile/add-profiles", getSetupProfiles);

// routers for home page
router.get("/accounts/:account_id/profile/:profile_id/home", getHomePage);
router.delete("/accounts/:accound_id/profile/:profile_id/logout", userLogout);
router.get(
  "/accounts/:account_id/profile/:profile_id/baby",
  getBabyProfilePage
);

// routers for sleep page
router.get("/accounts/:account_id/profile/:profile_id/sleep", getSleepPage);
router.post("/accounts/:account_id/profile/:profile_id/sleep", postSleep);
router.put(
  "/accounts/:account_id/profile/:profile_id/sleep/:sleep_id",
  updateSleep
);
router.delete(
  "/accounts/:account_id/profile/:profile_id/sleep/:sleep_id",
  deleteSleep
);

// routers for feed page
router.get("/accounts/:account_id/profile/:profile_id/feeds", getFeedPage);
router.post("/accounts/:account_id/profile/:profile_id/feeds", postFeed);
router.put(
  "/accounts/:account_id/profile/:profile_id/feeds/:feed_id",
  updateFeed
);
router.delete(
  "/accounts/:account_id/profile/:profile_id/feeds/:feed_id",
  deleteFeed
);

// routers for diaper-changing page
router.get(
  "/accounts/:account_id/profile/:profile_id/diaper-changes",
  getDiaperChangePage
);
router.post(
  "/accounts/:account_id/profile/:profile_id/diaper-changes",
  postDiaperChange
);
router.put(
  "/accounts/:account_id/profile/:profile_id/diaper-changes/:diaper_change_id",
  updateDiaperChange
);
router.delete(
  "/accounts/:account_id/profile/:profile_id/diaper-changes/:diaper_change_id",
  deleteDiaperChange
);

// milestones routes
router.get(
  "/accounts/:account_id/profile/:profile_id/milestones",
  getMilestonesPage
);
router.post(
  "/accounts/:account_id/profile/:profile_id/milestones",
  postMilestone
);

// app middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // get form data
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use("/", router);

app.listen(PORT);
