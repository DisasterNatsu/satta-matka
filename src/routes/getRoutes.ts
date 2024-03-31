import { isAdminAuth } from "../middlewares/admin/isAdminAuth";
import {
  getCurrentDayResults,
  lastTwoDays,
  lastTenDays,
  previousData,
  getTipsData,
  GeneratedData,
  getPattiTips,
  getRepeatPatti,
} from "../controllers/client/getRequestHandler";
import exprress from "express";

const Router = exprress.Router();

Router.get("/current/:date", getCurrentDayResults);
Router.get("/lastTwo/:date", lastTwoDays);
Router.get("/lastTen/:date", lastTenDays);
Router.get("/previous/:date", previousData);
Router.get("/tips/:date", getTipsData);
Router.get("/patti-tips/:date", getPattiTips);
Router.get("/repeat-patti", getRepeatPatti);
Router.get("/generated-tips/:date", isAdminAuth, GeneratedData);

export default Router;
