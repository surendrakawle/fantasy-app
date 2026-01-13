import { Response } from "express";
import { UserBankAccountService } from "../services/userBankAccount.service";
import { mapUserBankAccount } from "../mappers/userBankAccount.mapper";
import { success, error } from "../utils/apiResponse";

export const listMyBankAccounts = async (req: any, res: Response) => {
  try {
    const accounts =
      await UserBankAccountService.list(req.user.userId);

    return success(
      res,
      accounts.map(mapUserBankAccount),
      "Bank accounts fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

export const addMyBankAccount = async (req: any, res: Response) => {
  try {
    const account =
      await UserBankAccountService.add(
        req.user.userId,
        req.body
      );

    return success(
      res,
      mapUserBankAccount(account),
      "Bank account added",
      201
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const removeMyBankAccount = async (
  req: any,
  res: Response
) => {
  try {
    const account =
      await UserBankAccountService.remove(
        req.user.userId,
        req.params.id
      );

    return success(
      res,
      mapUserBankAccount(account),
      "Bank account removed"
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
