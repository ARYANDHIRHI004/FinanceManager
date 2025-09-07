import { enviroment } from "../constents.js";
import { AccountMember } from "../models/accountMembers.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.headers("Authorization").replace("Bearer ", "");
  if (!accessToken) {
    throw new ApiError(401, "Not Logged In");
  }
  const decodedToken = jwt.verify(accessToken, enviroment.ACCESS_TOKEN_SECRET);

  req.user = decodedToken;
  next();
});

const checkAccountMemberRole = function (roles = []) {
  return asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const accountId = req.params;

    const member = await AccountMember.findOne({
      memberId: userId,
      accountId,
    });

    if (!member) {
      throw new ApiError(401, "You are not memer of this account");
    }

    const role = member?.role;

    req.user.role = role;

    if (!roles.includes(role)) {
      throw new ApiError(401, "Unauthorized request");
    }
    next;
  });
};

export { verifyJWT, checkAccountMemberRole };
