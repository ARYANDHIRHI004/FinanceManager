import { Router } from "express";
import { createOrder, freePlanSubscription, verifyPayment } from "../controllers/subscriptions.controllers.js";

const subscriptionRouter = Router();

// subscriptionRouter.route("/check-subscription").get(checkSubscription);

subscriptionRouter.route("/create-order").post(createOrder);
subscriptionRouter.route("/verify-payment").post(verifyPayment);
subscriptionRouter.route("/free-account").post(freePlanSubscription);



export default subscriptionRouter;