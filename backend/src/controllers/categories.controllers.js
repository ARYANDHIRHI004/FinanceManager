import { Category } from "../models/categories.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const addCategory = asyncHandler(async (req, res) => {
  const { categoryName, budget } = req.body;
  const userId = req.user?._id;
  const { accountId } = req.params;

  const existedCategory = await Category.findOne({
    categoryName,
    accountId,
  });

  if (existedCategory) {
    throw new ApiError(401, "Category already Exist");
  }

  const category = await Category.create({
    categoryName,
    userId,
    accountId,
    budget,
  });

  if (!category) {
    throw new ApiError(401, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiError(201, "Category created successfully", category));
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const { accountId } = req.params;

  const categories = await Category.find({
    accountId,
  });

  if (!categories) {
    throw new ApiError(401, "No categories to show");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Categories find successfully", categories));
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const categoryId = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(401, "category not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Category found successfully", category));
});

export const setBudget = asyncHandler(async (req, res) => {
  const {categoryId} = req.params;
  const {budget} = req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    {
      categoryId,
    },
    {
      $set: {
        budget,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  if (!updatedCategory) {
    throw new ApiError(401, "Category not fount");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Budget set successfully", updatedCategory));
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params

    const deletedCategory = await Category.findByIdAndDelete(categoryId)

    if(!deletedCategory){
        throw new ApiError(401, "Category not found")
    }

    return res.status(200).json(
        new ApiResponse(201, "Category deleted successfully", {})
    )
});

export const updateCategory = asyncHandler(async (req, res) => {});
