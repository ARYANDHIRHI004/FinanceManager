import mongoose from "mongoose";
import { Transection } from "../models/transections.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createTransection = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const { projectId, categoryId, amount, note, transectionType } = req.body;

  const existedTransection = await Transection.findOne({
    accountId,
    $or: [{ "for.projectId": projectId }, { "for.categoryId": categoryId }],
  });

  const transection = await Transection.create({
    accountId,
    for: { projectId, categoryId },
    userId: req.user?._id,
    amount,
    note,
    transectionType,
  });

  if (!transection) {
    throw new ApiError(501, "Internal server error");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(201, "Transection created successfully", transection),
    );
});

export const getAllCategoryTransection = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  console.log(accountId);

  const transection = await Transection.aggregate([
    {
      $match: {
        accountId: new mongoose.Types.ObjectId(accountId),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "for.categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
  ]);

  if (!transection) {
    throw new ApiError(401, "No transection found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Transection found successfully", transection));
});

export const getAllProjectTransection = asyncHandler(async (req, res) => {
  const { accountId } = req.params;

  const transection = await Transection.aggregate([
    {
      $match: {
        accountId: new mongoose.Types.ObjectId(accountId),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "for.projectId",
        foreignField: "_id",
        as: "category",
      },
    },
  ]);

  if (!transection) {
    throw new ApiError(401, "No transection found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Transection found successfully", transection));
});

export const deleteTransection = asyncHandler(async (req, res) => {
  const { transectionId } = req.params;

  const deletedTransection = await Transection.findByIdAndDelete(transectionId);

  if (!deletedTransection) {
    throw new ApiError(401, "Transection not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Transection deleted successfully", {}));
});
