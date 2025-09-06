import { Subscription } from "../models/subscriptions.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const checkSubscription = asyncHandler(async (req, res, next) => {
  
  const subscription = await Subscription.findById(req.user?._id);
  if (!subscription) {
    throw new ApiError(401, "Please Subscribe a plan");
  }

  if (subscription.subscriptionPlan !== "PREMIUM_PLAN") {
    throw new ApiError(
      401,
      "You are not eligible to create more account, please upgrade plan",
    );
  }

  if(subscription.status !== "active"){
    throw new ApiError(401, "Please renew plan");
  }

  next();
});
