import mongoose from "mongoose";
import {
  transectionTypeEnum,
  transectionTypeEnumOptions,
} from "../constents.js";

const transectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    for: {
      projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
      },
      categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    },
    amount: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    transectionType: {
      type: String,
      enum: transectionTypeEnumOptions,
    },
    transectionRecipt: {
      url: {
        type: String,
        default: ``,
      },
    },
  },
  { timestamps: true },
);

export const Transection = mongoose.model("Transection", transectionSchema);
