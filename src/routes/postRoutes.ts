import express from "express";
import {
  deleteFromResults,
  postBajiTips,
  postMatkaData,
  postPattiTips,
  postRepetPatti,
} from "../controllers/admin/postRequestHandler";
import { isAdminAuth } from "../middlewares/admin/isAdminAuth";

const Router = express.Router();

Router.post("/current", isAdminAuth, postMatkaData);
Router.post("/matka-tips", isAdminAuth, postBajiTips);
Router.post("/matka-patti-tips", isAdminAuth, postPattiTips);
Router.post("/repeat-patti", isAdminAuth, postRepetPatti);
Router.post("/delete-result", isAdminAuth, deleteFromResults);

export default Router;
