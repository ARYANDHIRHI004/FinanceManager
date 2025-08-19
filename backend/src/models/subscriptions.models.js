import mongoose from "mongoose";
import { SubscriptionEnum, SubscriptionEnumOptions } from "../constents.js";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    paymemtId: {
      type: String,
    },
    subscriptionPlan: {
      type: String,
      enum: SubscriptionEnumOptions,
      default: SubscriptionEnum.FREE_PLAN,
    },
    price: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
