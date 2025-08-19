import mongoose from "mongoose";
import { accountTypeEnum, accountTypeEnumOptions } from "../constents";

const accountSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    accountType: {
      type: String,
      enum: accountTypeEnumOptions,
      default: accountTypeEnum.FREE,
    },
  },
  { timestamps: true },
);

export const Account = mongoose.model("Account", accountSchema);
