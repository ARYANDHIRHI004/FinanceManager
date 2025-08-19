import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = "FinenceManager"; //DB Name

//environment variabels
export const enviroment = {
  MONGODB_URL: process.env.MONGODB_URL,
  ORIGIN: process.env.ORIGIN,
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};

export const accountUserRole = {
  ADMIN: "Admin",
  COLLABORATER: "collaborater",
  MEMBER: "MEMBER",
};
export const accountUserEnumOptions = Object.values(accountUserRole);

export const accountTypeEnum = {
  PRIVATE: "Private",
  JOINT: "Joint",
};
export const accountTypeEnumOptions = Object.values(accountTypeEnum);

export const projectRoleEnum = {
  PROJECT_ADMIN: "Project_Admin",
  PROJECT_MEMBER: "Project_Member",
};
export const projectRoleEnumOptions = Object.values(projectRoleEnum);

export const SubscriptionEnum = {
  FREE_PLAN: "Free_Plan",
  PREMIUM_PLAN: "Premium_Plan",
};
export const SubscriptionEnumOptions = Object.values(SubscriptionEnum);

export const transectionTypeEnum = {
    IN: "In",
    OUT: "Out",
}
export const transectionTypeEnumOptions = Object.values(transectionTypeEnum);
