import mongoose from "mongoose";
import { accountUserEnumOptions, accountUserRole } from "../constents";

const accountMemberSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    role:{
        type:String,
        enum: accountUserEnumOptions,
        default: accountUserRole.MEMBER
    }
  },
  { timestamps: true },
);

export const AccountMember = mongoose.model(
  "AccountMember",
  accountMemberSchema,
);
