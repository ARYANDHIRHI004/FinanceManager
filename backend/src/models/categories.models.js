import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    categoryName: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", categoriesSchema);
