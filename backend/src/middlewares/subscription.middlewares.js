import { Subscription } from "../models/subscriptions.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const checkSubscription = function (plans = []) {
  return asyncHandler(async (req, res, next) => {
    const subscription = await Subscription.findById(req.user?._id);

    if (!subscription) {
      throw new ApiError(401, "Please Subscribe a plan");
    }

    const plan = subscription?.subscriptionPlan;

    if (!plans.includes(plan)) {
      throw new ApiError(401, "You plan is not valid.");
    }

    next();
  });
};


export { checkSubscription }