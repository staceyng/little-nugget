import express from "express";
import methodOverride from "method-override";
import {
  getLogin,
  postLogin,
  getSetupByAccountId,
  getSignup,
  postSetupByAccountId,
  postSignup,
} from "./routes/userAccounts.js";

import { getHomePage } from "./routes/home.js";

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

// app middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // get form data
app.use(methodOverride("_method"));
// app.use(cookieParser());
app.use("/", router);

app.listen(PORT);
