import { Account } from "../models/accounts.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const checkAccountType = (accountsType = []) => {
  return asyncHandler(async (req, res, next) => {
    const { accountId } = req.params;

    const account = await Account.findById(accountId);

    if (!account) {
      throw new ApiError(401, "Account does not exist");
    }

    const accountType = account.accountType;

    if (!accountsType.includes(accountType)) {
      throw new ApiError(401, "Not valid account");
    }
    next();
  });
};

export { checkAccountType };
