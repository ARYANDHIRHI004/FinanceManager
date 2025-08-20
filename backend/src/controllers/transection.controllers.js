import { Transection } from "../models/transections.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createTransection = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const { projectId, categoryId, amount, note, transectionType } = req.body;

  const existedTransection = await Transection.findOne({
    accountId,
    for: {
      $or: [{ projectId }, { categoryId }],
    },
  });

  if (existedTransection) {
    throw new ApiError(401, "Transection already exist");
  }

  const transection = await Transection.create({
    accountId,
    for: {
      $or: [{ projectId }, { categoryId }],
    },
    userId: req.user?._id,
    amount,
    note,
    transectionType,
  });

  if (!transection) {
    throw new ApiError(501, "Internal server error");
  }

  return res
    .statues(200)
    .json(
      new ApiResponse(201, "Transection created successfully", transection),
    );
});

export const getAllCategoryTransection = asyncHandler(async (req, res) => {
  const { accountId, categoryId } = req.params;

  const transection = await Transection.find({
    accountId,
    "for.categoryId": categoryId,
  });

  if (!transection) {
    throw new ApiError(401, "No transection found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Transection found successfully", transection));
});

export const getAllProjectTransection = asyncHandler(async (req, res) => {
  const { accountId, projectId } = req.params;

  const transection = await Transection.find({
    accountId,
    "for.projectId": projectId,
  });

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
