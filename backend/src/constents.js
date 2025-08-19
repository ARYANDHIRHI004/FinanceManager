import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = "FinenceManager";

export const enviroment = {
  MONGODB_URL: process.env.MONGODB_URL,
  ORIGIN: process.env.ORIGIN,
  PORT: process.env.PORT,
};
