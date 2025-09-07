import { Router } from "express";
import { checkAccountMemberRole, verifyJWT } from "../middlewares/auth.middlewares.js";
import { addCategory, deleteCategory, getAllCategories, setBudget, updateCategory } from "../controllers/categories.controllers.js";

const categoryRouter = Router()

categoryRouter.route("/add-category/:accountId").post(verifyJWT, checkAccountMemberRole(["ADMIN", "COLLABORATER"]), addCategory) // middleware to check ADMIN and Collaborater for the Account

categoryRouter.route("/get-categories/:accountId").get(verifyJWT, checkAccountMemberRole(["ADMIN", "COLLABORATER", "MEMBER"]), getAllCategories) // middlewares for the ADMIN, COLLABORATERS and MEMBER

categoryRouter.route("/get-categories-by-id/:accountId").get(verifyJWT, checkAccountMemberRole(["ADMIN", "COLLABORATER", "MEMBER"]), getAllCategories) // middlewares for the ADMIN, COLLABORATERS and MEMBER

categoryRouter.route("/update-budget-to-category/:categoryId").put(verifyJWT, checkAccountMemberRole(["ADMIN", "COLLABORATER"]), setBudget) // middleware to check ADMIN and Collaborater for the Account

categoryRouter.route("/update-category/:categoryId").put(verifyJWT, checkAccountMemberRole(["ADMIN", "COLLABORATER"]), updateCategory) // middleware to check ADMIN and Collaborater for the Account

categoryRouter.route("/delete-category/:categoryId").delete(verifyJWT, checkAccountMemberRole(["ADMIN", "COLLABORATER"]), deleteCategory) // middleware to check ADMIN and Collaborater for the Account

export default categoryRouter