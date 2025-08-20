import { Router } from "express";
import { createTransection, deleteTransection, getAllCategoryTransection, getAllProjectTransection } from "../controllers/transection.controllers.js";

const transectionRouter = Router()

transectionRouter.route("/create-transection/:accountId").post(createTransection)
transectionRouter.route("/get-all-category-transection/:accountId/category/:categoryId").get(getAllCategoryTransection)
transectionRouter.route("/get-all-project-transection/:accountId/project/:projectId").get(getAllProjectTransection)
// transectionRouter.route("/update-transection/:transectionId").put(updateTransection)
transectionRouter.route("/delete-transection/:transectionId").delete(deleteTransection)

export default transectionRouter