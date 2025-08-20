import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { enviroment } from "./constents.js";
import accountRouter from "./routes/accounts.routes.js";
import categoryRouter from "./routes/categories.routes.js";
import projectRouter from "./routes/projects.routes.js";

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
app.use("/api/v1/accounts", accountRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/projects", projectRouter)

export default app;
