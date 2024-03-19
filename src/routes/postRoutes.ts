import express from "express";
import { postMatkaData } from "../controllers/admin/postRequestHandler";
import { isAdminAuth } from "../middlewares/admin/isAdminAuth";

const Router = express.Router();

Router.post("/current", isAdminAuth, postMatkaData);

export default Router;
