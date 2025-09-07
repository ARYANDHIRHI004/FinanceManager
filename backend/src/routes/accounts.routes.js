import { Router } from "express";
import { checkSubscription } from "../middlewares/subscription.middlewares.js";
import { checkAccountMemberRole, verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addMembersToAccount,
  createAccount,
  getAccountById,
  getJointAccounts,
  getMyAccounts,
  removeMembersFromAccount,
  updateRoleOfMembers,
} from "../controllers/accounts.controllers.js";

const accountRouter = Router();

accountRouter.route("/get-my-accounts").get(verifyJWT, getMyAccounts);

accountRouter.route("/get-join-accounts").get(verifyJWT, getJointAccounts); // RBAC middleware for account membership checking

accountRouter
  .route("/get-account-by-id/:accountId")
  .get(verifyJWT, checkAccountMemberRole(["ADMIN", "COLLABORATER", "MEMBER"]), getAccountById);

accountRouter.route("/create-account").post(verifyJWT, checkSubscription(["Free_Plan", "Premium_Plan"]), createAccount);

accountRouter
  .route("/add-members-to-account/:accountId")
  .post(verifyJWT, checkSubscription(["Premium_Plan"]), checkAccountMemberRole(["ADMIN", "COLLABORATER"]), addMembersToAccount); //add middleware for authorization or RBAC and account type 

accountRouter
  .route("/update-members-to-account/:accountId")
  .delete(verifyJWT, checkSubscription(["Premium_Plan"]), checkAccountMemberRole(["ADMIN", "COLLABORATER"]), removeMembersFromAccount); //add middleware for authorization or RBAC and account type

accountRouter
  .route("/update-role-of-members/:accountId")
  .put(verifyJWT, checkSubscription(["Premium_Plan"]), checkAccountMemberRole(["ADMIN", "COLLABORATER"]), updateRoleOfMembers); //add middleware for authorization or RBAC and account type

// accountRouter.route("/update-account/:accountId").put(verifyJWT, updateAccount);

// accountRouter.route("/delete-account/:accountId").delete(verifyJWT, deleteAccount);

export default accountRouter;
