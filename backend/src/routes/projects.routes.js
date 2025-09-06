import { Router } from "express";
import { addMemberToProject, createProject, deleteProject, getAllProject, getAllProjectMembers, getMyProject, getProjectById, removeMemberFromProject, updateProject, updateRoleOfProjectMembers } from "../controllers/projects.controllers.js";

const projectRouter = Router()

projectRouter.route("/create-project/:accountId").post(createProject) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, 

projectRouter.route("/get-all-projects/:accountId").get(getAllProject) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, 

projectRouter.route("/get-my-projects/:accountId").get(getMyProject) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, 

projectRouter.route("/get-project-by-id/:projectId").get(getProjectById) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, 

projectRouter.route("/update-project/:projectId").put(updateProject) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, 

projectRouter.route("/delete-project/:projectId").delete(deleteProject) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, 

projectRouter.route("/add-members-to-project/:projectId").post(addMemberToProject) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

projectRouter.route("/remove-members-from-project/:projectId").delete(removeMemberFromProject) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

projectRouter.route("/get-all-project-members/:projectId").get(getAllProjectMembers) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

projectRouter.route("/update-role-of-project-members/:projectId").get(updateRoleOfProjectMembers) // middlewares - verifyJW, subscription-premium, account-type, account-admin or collaborater, project-admin

export default projectRouter