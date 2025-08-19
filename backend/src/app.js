import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { enviroment } from "./constents.js";
import accountRoutes from "./routes/accounts.routes.js";

const app = express();

app.use(
  cors({
    origin: enviroment.ORIGIN,
  }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//routes import
app.use("/api/v1/accounts", accountRoutes)

export default app;
