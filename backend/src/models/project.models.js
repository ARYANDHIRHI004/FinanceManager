import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    projectName: {
      type: String,
      required: true,
    },
    projectDesc: {
      type: String,
      required: true,
    },
    projectBudget: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
