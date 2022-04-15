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
} from "./routes/userAccounts.js";
import { getHomePage } from "./routes/home.js";
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

// routers for home page
router.get("/accounts/:account_id/profile/:profile_id/home", getHomePage);

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

// app middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // get form data
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use("/", router);

app.listen(PORT);
