import Razorpay from "razorpay";
import { Subscription } from "../models/subscriptions.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = asyncHandler(async (req, res) => {
  const { subscriptionPlan, amount } = req.body;

  const alreadySubscribed = await Subscription.findOne({
    userId: req.user?._id,
    subscriptionPlan: "PREMIUM_PLAN",
  });

  if (alreadySubscribed) {
    throw new ApiError(401, "You are already subscribed");
  }

  let subscription = await Subscription.findOne({
    userId: req.user?._id,
    subscriptionPlan: "FREE_PLAN",
  });

  if (!subscription) {
    subscription = await Subscription.create({
      userId: req.user?._id,
      subscriptionPlan,
    });
  }

  const options = {
    amount: price * 100,
    currency: "INR",
    receipt: `subscription_123456`,
  };

  const order = await razorpay.orders.create(options, (error, order) => {
    if (error) {
      throw new ApiError(401, error);
    }
  });

  if (!order) {
    throw new ApiError(501, "Internal server error");
  }

  subscription.paymemtId = order.id;
  subscription.amount = amount;
  subscription.status = "pending";
  await subscription.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Subscription successfull", subscription));
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const subscription = await Subscription.findOne({
    paymemtId: razorpay_order_id,
  });

  if (!subscription) {
    throw new ApiError(401, "Subscription does not exist");
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (razorpay_signature !== expectedSignature) {
    throw new ApiError(401, "Invalid signature");
  }

  subscription.subscriptionPlan = "PREMIUM_PLAN";
  subscription.status = "active";
  await subscription.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Subscription successfull", subscription));
});

export const freePlanSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({
    userId: req.user?._id,
  });

  if (subscription) {
    throw new ApiError(401, "You are already subscribed");
  }

  const newSubscription = await Subscription.create({
    userId: req.user?._id,
  });

  if (!newSubscription) {
    throw new ApiError(501, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Subscription successfull", newSubscription));
});
