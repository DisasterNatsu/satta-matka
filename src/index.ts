import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// routes

import GetRoutes from "./routes/getRoutes";
import PostRoutes from "./routes/postRoutes";
import AuthRoutes from "./routes/authRoute";

// initialize app

const app: Express = express();

// initiate enviornnment variable

dotenv.config();

// body parser

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// express json

app.use(express.json());

// use cors (currently it's global)

// define origin

const origins: string[] = [
  "https://smartmumbaimatka.in",
  "https://admin.kolkataff.space",
  "https://localhost:3000",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) {
    if (!origin || origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors());

// routes

app.use("/get", GetRoutes);
app.use("/post", PostRoutes);
app.use("/auth", AuthRoutes);

try {
  // connect to database

  mongoose
    .connect("mongodb://adminFatafat:Disaster%401997@localhost:27017/fatafat")
    .then(() => console.log("Connected to database"));

  // start the server

  app.listen(process.env.PORT || 8020, () => {
    console.log(`Listning on port ${process.env.PORT || 8020}`);
  });
} catch (error) {
  console.error(error);
}
