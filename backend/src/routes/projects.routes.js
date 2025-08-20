import { Router } from "express";
import { createProject } from "../controllers/projects.controllers.js";

const projectRouter = Router()

projectRouter.route("/create-project/:accountId").post(createProject)
projectRouter.route("/get-all-projects/:accountId").get(getAllProject)
projectRouter.route("/get-my-projects/:accountId").get(getMyProject)
projectRouter.route("/get-project-by-id/:projectId").get(getProjectById)
projectRouter.route("/update-project/:projectId").put(updateProject)
projectRouter.route("/delete-project/:projectId").delete(deleteProject)

projectRouter.route("/add-members-to-project/:projectId").post(addMemberToProject)
projectRouter.route("/remove-members-from-project/:projectId").delete(removeMemberFromProject)
projectRouter.route("/get-all-project-members/:projectId").get(getAllProjectMembers)
projectRouter.route("/update-role-of-project-members/:projectId").get(updateRoleOfProjectMembers)

export default projectRouter