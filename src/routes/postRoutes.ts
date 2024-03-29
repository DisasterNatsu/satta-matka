import express from "express";
import {
  postBajiTips,
  postMatkaData,
  postPattiTips,
} from "../controllers/admin/postRequestHandler";
import { isAdminAuth } from "../middlewares/admin/isAdminAuth";

const Router = express.Router();

Router.post("/current", isAdminAuth, postMatkaData);
Router.post("/matka-tips", isAdminAuth, postBajiTips);
Router.post("/matka-patti-tips", isAdminAuth, postPattiTips);

export default Router;
