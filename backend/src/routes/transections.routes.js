import { Router } from "express";
import { createTransection, deleteTransection, getAllCategoryTransection, getAllProjectTransection } from "../controllers/transection.controllers.js";

const transectionRouter = Router()

transectionRouter.route("/create-transection/:accountId").post(createTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

transectionRouter.route("/get-all-category-transection/:accountId/category/:categoryId").get(getAllCategoryTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

transectionRouter.route("/get-all-project-transection/:accountId/project/:projectId").get(getAllProjectTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

// transectionRouter.route("/update-transection/:transectionId").put(updateTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

transectionRouter.route("/delete-transection/:transectionId").delete(deleteTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

export default transectionRouter