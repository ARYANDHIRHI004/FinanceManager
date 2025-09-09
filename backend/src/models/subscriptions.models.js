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
    amount: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },

  },
  { timestamps: true },
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
