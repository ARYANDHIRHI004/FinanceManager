import { Router } from "express";
import { createTransection, deleteTransection, getAllCategoryTransection, getAllProjectTransection } from "../controllers/transection.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { checkSubscription } from "../middlewares/subscription.middlewares.js";

const transectionRouter = Router()

transectionRouter.route("/create-transection/:accountId").post(verifyJWT, checkSubscription(["Premium_Plan", "Free_Plan"]), createTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

transectionRouter.route("/get-all-category-transection/:accountId/category/:categoryId").get(verifyJWT, checkSubscription(["Premium_Plan", "Free_Plan"]), getAllCategoryTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

transectionRouter.route("/get-all-project-transection/:accountId/project/:projectId").get(verifyJWT, checkSubscription([""]), getAllProjectTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

// transectionRouter.route("/update-transection/:transectionId").put(updateTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

transectionRouter.route("/delete-transection/:transectionId").delete(verifyJWT, checkSubscription([""]), deleteTransection) // verifyJWT, account-admin or collaborater, subscription - free and paid

export default transectionRouter