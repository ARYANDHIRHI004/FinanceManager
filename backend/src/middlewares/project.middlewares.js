import { Project } from "../models/project.models";
import { ProjectMamber } from "../models/projectMembers.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";

const checkProjectMemberRole = function (roles = []) {
  return asyncHandler(async (req, _, next) => {
    const { projectId } = req.params;
    const { userId } = req.user?._id;

    const member = await ProjectMamber.findOne({
      projectMemberId: userId,
      projectId,
    });

    if (!member) {
      throw new ApiError(401, "You are not member of this project");
    }

    const memberRole = member.role;

    if (!roles.includes(memberRole)) {
      throw new ApiError(401, "You are not member of this project");
    }

    next();
  });
};

export { checkProjectMemberRole };
