import {
  getCurrentDayResults,
  lastTwoDays,
  lastTenDays,
  previousData,
  getTipsData,
} from "../controllers/client/getRequestHandler";
import exprress from "express";

const Router = exprress.Router();

Router.get("/current/:date", getCurrentDayResults);
Router.get("/lastTwo/:date", lastTwoDays);
Router.get("/lastTen/:date", lastTenDays);
Router.get("/previous/:date", previousData);
Router.get("/tips/:date", getTipsData);

export default Router;
