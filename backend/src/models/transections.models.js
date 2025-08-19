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
    ammount: {
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
