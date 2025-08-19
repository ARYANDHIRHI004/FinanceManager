import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = "FinenceManager";

export const enviroment = {
  MONGODB_URL: process.env.MONGODB_URL,
  ORIGIN: process.env.ORIGIN,
  PORT: process.env.PORT,
};

export const accountUserRole = {
  ADMIN: "Admin",
  COLLABORATER: "collaborater",
  MEMBER: "MEMBER",
};
export const accountUserEnumOptions = Object.values(accountUserRole);

export const accountTypeEnum = {
  FREE: "free",
  PREMIUM: "Premium",
};
export const accountTypeEnumOptions = Object.values(accountTypeEnum);
