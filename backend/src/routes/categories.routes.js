import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { addCategory, deleteCategory, getAllCategories, setBudget, updateCategory } from "../controllers/categories.controllers.js";

const categoryRouter = Router()

categoryRouter.route("/add-category/:accountId").post(verifyJWT, addCategory)
categoryRouter.route("/get-categories/:accountId").get(verifyJWT, getAllCategories)
categoryRouter.route("/get-categories-by-id/:accountId").get(verifyJWT, getAllCategories)
categoryRouter.route("/update-budget-to-category/:categoryId").put(verifyJWT, setBudget)
categoryRouter.route("/update-category/:categoryId").put(verifyJWT, updateCategory)
categoryRouter.route("/delete-category/:categoryId").delete(verifyJWT, deleteCategory)

export default categoryRouter