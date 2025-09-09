import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { enviroment } from "./constents.js";

const app = express();

app.use(
  cors({
    origin: enviroment.ORIGIN,
    credentials: true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization']
  }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//routes import
import accountRouter from "./routes/accounts.routes.js";
import categoryRouter from "./routes/categories.routes.js";
import projectRouter from "./routes/projects.routes.js";
import transectionRouter from "./routes/transections.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/transections", transectionRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

export default app;
