import { accountTypeEnum, accountUserRole } from "../constents.js";
import { AccountMember } from "../models/accountMembers.models.js";
import { Account } from "../models/accounts.models.js";
import { Subscription } from "../models/subscriptions.models.js";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createAccount = asyncHandler(async (req, res) => {
  const { accountName, accountType } = req.body;

  const subscription = await Subscription.findOne({
    userId: req.user?._id,
  });

  if (subscription.subscriptionPlan !== PREMIUM_PLAN) {
    const existingAccount = await Account.findOne({
      owner: req.user?._id,
    });
    if (existingAccount) {
      throw new ApiError(
        401,
        "You can create more accounts in  your current plan ",
      );
    } else {
      const account = await Account.create({
        accountName,
        userId: req.user?._id,
      });
      return res
        .status(200)
        .json(new ApiResponse(201, "Account created successfully", account));
    }
  }

  const account = await Account.create({
    accountName,
    userId: req.user?._id,
    accountType: accountType,
  });
  return res
    .status(200)
    .json(new ApiResponse(201, "Account created successfully", account));
});

export const getMyAccounts = asyncHandler(async (req, res) => {
  const { accountType } = req.body;

  const account = await Account.find({
    owner: req.user?._id,
    accountType: accountType,
  });

  if (!account) {
    throw new ApiError(401, "No accounts to show");
  }

  return res.status(200).json(201, "Accounts get successfully", account);
});

export const getJointAccounts = asyncHandler(async (req, res) => {
  
  //Aggregation pipeline joining doc of AccountMember and Account
  const accounts = await AccountMember.find({
    memberId: req.user?._id,
    role: {
      $or: [accountUserRole.COLLABORATER, accountUserRole.MEMBER],
    },
  });

  if (!accounts) {
    throw new ApiError(401, "You are not member of any joint account");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Account Fetched successfully", accounts));
});

export const getAccountById = asyncHandler(async (req, res) => {
  const { accountId } = req.params;

  const account = await Account.findById(accountId);

  if (!account) {
    throw new ApiError(401, "Account not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Account fetched Successfully", account));
});

export const addMembersToAccount = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const { memberEmail } = req.body;

  const member = await User.findOne({
    email: memberEmail,
  });

  if (!member) {
    throw new ApiError(401, "Wrong email Id");
  }

  const existedMember = await AccountMember.findOne({
    accountId,
    memberId: member._id,
  });

  if (existedMember) {
    throw new ApiError(401, "Allready member of this account");
  }

  const createdMember = await AccountMember.create({
    memberId: member._id,
    accountId,
  });

  if (!createdMember) {
    throw new ApiError(501, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Member Added To account", createdMember));
});

export const removeMembersFromAccount = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const { memberEmail } = req.body;

  const user = await User.findOne({
    email: memberEmail,
  });

  if (!user) {
    throw new ApiError(401, "Wrong email Id");
  }

  const member = await AccountMember.findOneAndDelete({
    accountId,
    memberId: user._id,
  });

  if (!member) {
    throw new ApiError(401, "Internal server Error");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Member removed from account successfully", {}));
});

export const updateRoleOfMembers = asyncHandler(async (req, res) => {
  const { memberId, role } = req.body;

  const updatedRoleOfMember = await AccountMember.findOneAndUpdate(
    {
      memberId,
    },
    {
      $set: {
        role: role,
      },
    },
    { new: true, upsert: true },
  );

  if (!updatedRoleOfMember) {
    throw new ApiError(501, "internal server error");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(201, "Role updated successfully", updatedRoleOfMember),
    );
});
