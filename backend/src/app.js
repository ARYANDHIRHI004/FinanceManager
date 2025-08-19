import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { enviroment } from "./constents.js";

const app = express();

app.use(
  cors({
    origin: enviroment.ORIGIN,
  }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

export default app;
