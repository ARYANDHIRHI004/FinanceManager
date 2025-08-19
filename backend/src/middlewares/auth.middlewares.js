import { enviroment } from "../constents.js";
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

  req.user._ud = decodedToken._id;
  next();
});


export {verifyJWT}
