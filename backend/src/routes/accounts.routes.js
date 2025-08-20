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

const accountRouter = Router();

accountRouter.route("/get-my-accounts").get(verifyJWT, getMyAccounts);
accountRouter.route("/get-join-accounts").get(verifyJWT, getJointAccounts);
accountRouter
  .route("/get-account-by-id/:accountId")
  .get(verifyJWT, getAccountById);
accountRouter.route("/create-account").post(verifyJWT, createAccount);
// accountRouter.route("/update-account/:accountId").put(verifyJWT, updateAccount);
// accountRouter.route("/delete-account/:accountId").delete(verifyJWT, deleteAccount);
accountRouter
  .route("/add-members-to-account/:accountId")
  .post(verifyJWT, addMembersToAccount);
accountRouter
  .route("/update-members-to-account/:accountId")
  .delete(verifyJWT, removeMembersFromAccount);
accountRouter
  .route("/update-role-of-members/:accountId")
  .put(verifyJWT, updateRoleOfMembers);

export default accountRouter;
