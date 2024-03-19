import express from "express";
import {
  AdminRegister,
  AdminLogIn,
  AdminTokenVerification,
} from "../controllers/admin/adminAuth";

import {
  ClientRegister,
  ClientLogIn,
  TokenVerification,
} from "../controllers/client/clientAuth";

const Router = express.Router();

// admin

Router.post("/admin/register", AdminRegister);
Router.post("/admin/log-in", AdminLogIn);
Router.get("/admin/is-auth", AdminTokenVerification);

// client

Router.post("/user/register", ClientRegister);
Router.post("/user/log-in", ClientLogIn);
Router.get("/user/is-auth", TokenVerification);

export default Router;
