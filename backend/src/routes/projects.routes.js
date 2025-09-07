import { Router } from "express";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getAllProject,
  getAllProjectMembers,
  getMyProject,
  getProjectById,
  removeMemberFromProject,
  updateProject,
  updateRoleOfProjectMembers,
} from "../controllers/projects.controllers.js";
import { checkAccountMemberRole, verifyJWT } from "../middlewares/auth.middlewares.js";
import { checkAccountType } from "../middlewares/account.middlewares.js";
import { checkSubscription } from "../middlewares/subscription.middlewares.js";
import { checkProjectMemberRole } from "../middlewares/project.middlewares.js";

const projectRouter = Router();

projectRouter.route("/create-project/:accountId").post(verifyJWT, checkSubscription(["Premium_Plan"]), checkAccountType(["joint"]), checkAccountMemberRole(["ADMIN", "COLLABORATER"]), createProject); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater,

projectRouter.route("/get-all-projects/:accountId").get(verifyJWT, getAllProject); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater,

projectRouter.route("/get-my-projects/:accountId").get(verifyJWT, getMyProject); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater,

projectRouter.route("/get-project-by-id/:projectId").get(verifyJWT, checkAccountType(["joint"]), checkProjectMemberRole(["Project_Member", "Project_Admin"]), getProjectById); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater,

projectRouter.route("/update-project/:projectId").put(verifyJWT, checkAccountType(["joint"]), checkProjectMemberRole(["Project_Admin"]), updateProject); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater,

projectRouter.route("/delete-project/:projectId").delete(verifyJWT, checkAccountType(["joint"]), checkProjectMemberRole(["Project_Admin"]), deleteProject); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater,

projectRouter
  .route("/add-members-to-project/:projectId")
  .post(verifyJWT, checkAccountType(["joint"]), checkProjectMemberRole(["Project_Admin"]), addMemberToProject); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

projectRouter
  .route("/remove-members-from-project/:projectId")
  .delete(verifyJWT, checkAccountType(["joint"]), checkProjectMemberRole(["Project_Admin"]), removeMemberFromProject); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

projectRouter
  .route("/get-all-project-members/:projectId")
  .get(verifyJWT, checkAccountType(["joint"]), checkProjectMemberRole(["Project_Admin"]), getAllProjectMembers); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

projectRouter
  .route("/update-role-of-project-members/:projectId")
  .get(verifyJWT, checkAccountType(["joint"]), checkProjectMemberRole(["Project_Admin"]), updateRoleOfProjectMembers); // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

export default projectRouter;
