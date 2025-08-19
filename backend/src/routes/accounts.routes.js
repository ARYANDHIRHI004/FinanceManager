import { Router } from "express";
import { checkSubscription } from "../middlewares/subscription.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addMembersToAccount,
  createAccount,
  getAccountById,
  getJointAccounts,
  getMyAccounts,
  removeMembersFromAccount,
  updateRoleOfMembers,
} from "../controllers/accounts.controllers.js";

const accountRoutes = Router();

accountRoutes.route("/get-my-accounts").get(verifyJWT, getMyAccounts);
accountRoutes.route("/get-join-accounts").get(verifyJWT, getJointAccounts);
accountRoutes
  .route("/get-account-by-id/:accountId")
  .get(verifyJWT, getAccountById);
accountRoutes.route("/create-account").post(verifyJWT, createAccount);
// accountRoutes.route("/update-account/:accountId").put(verifyJWT, updateAccount);
// accountRoutes.route("/delete-account/:accountId").delete(verifyJWT, deleteAccount);
accountRoutes
  .route("/add-members-to-account/:accountId")
  .post(verifyJWT, addMembersToAccount);
accountRoutes
  .route("/update-members-to-account/:accountId")
  .delete(verifyJWT, removeMembersFromAccount);
accountRoutes
  .route("/update-role-of-members/:accountId")
  .put(verifyJWT, updateRoleOfMembers);

export default accountRoutes;
