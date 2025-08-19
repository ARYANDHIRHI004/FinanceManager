import mongoose from "mongoose";
import { projectRoleEnum, projectRoleEnumOptions } from "../constents.js";

const projectMamberSchema = new mongoose.Schema(
  {
    projectMemberId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
    role: {
      type: String,
      enum: projectRoleEnumOptions,
      default: projectRoleEnum.PROJECT_MEMBER,
    },
  },
  { timestamps: true },
);

export const ProjectMamber = mongoose.model(
  "ProjectMamber",
  projectMamberSchema,
);
