import { AccountMember } from "../models/accountMembers.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMamber } from "../models/projectMembers.models.js";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const { projectName, projectDesc, projectBudget } = req.body;

  const existingProject = await Project.findOne({
    projectName,
  });

  if (existingProject) {
    throw new ApiError(401, "Project already exist");
  }

  const project = await Project.create({
    projectName,
    projectBudget,
    projectDesc,
    accountId,
    userId: req.user?._id,
  });

  if (!project) {
    throw new ApiError(501, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Project created successfully", project));
});

export const getAllProject = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const userId = req.user?._id;

  const projects = await AccountMember.find({
    accountId,
    memberId: userId,
  });

  if (!projects) {
    throw new ApiError(401, "No projects found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Project fetched successfully", projects));
});

export const getMyProject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { accountId } = req.params;

  const projects = await Project.find({
    userId,
    accountId,
  });

  if (!projects) {
    throw new ApiError(401, "No projects to show");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Projects fetched successfully", projects));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(401, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Project get successfully", project));
});

export const updateProject = asyncHandler(async (req, res) => {});

export const deleteProject = asyncHandler(async (req, res) => {});

export const addMemberToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { memberEmailId } = req.body;

  const member = await User.findOne({
    email: memberEmailId,
  });

  if (!member) {
    throw new ApiError(401, "user does not exist");
  }

  const existedMember = await ProjectMamber.findOne({
    projectMemberId: member._id,
    projectId,
  });

  if (existedMember) {
    throw new ApiError(401, "Member already exist");
  }

  const newMember = await ProjectMamber.create({
    projectId,
    projectMemberId: member._id,
  });

  if (!newMember) {
    throw new ApiError(501, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Member added to projetc", newMember));
});

export const removeMemberFromProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body;

  const deletedMember = await ProjectMamber.findOneAndDelete({
    projectId,
    projectMemberId: memberId,
  });

  if (!deletedMember) {
    throw new ApiError(501, "Error while remover member from project");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Meber deleted successfully", {}));
});

export const getAllProjectMembers = asyncHandler(async (req, res) => {
  const projectId = req.params;

  const members = await ProjectMamber.find({
    projectId,
  });

  if (!members) {
    throw new ApiError(401, "No member to show");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Members find successfully", members));
});

export const updateRoleOfProjectMembers = asyncHandler(async (req, res) => {});
