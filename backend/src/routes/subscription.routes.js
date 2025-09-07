import { Router } from "express";
import { createOrder, freePlanSubscription, verifyPayment } from "../controllers/subscriptions.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const subscriptionRouter = Router();

// subscriptionRouter.route("/check-subscription").get(checkSubscription);

subscriptionRouter.route("/create-order").post(verifyJWT, createOrder); // verifyJWT
subscriptionRouter.route("/verify-payment").post(verifyJWT, verifyPayment); // verifyJWT
subscriptionRouter.route("/free-account").post(verifyJWT, freePlanSubscription); // verifyJWT



export default subscriptionRouter;