import { Request, Response } from "express";
import { WithdrawalService } from "../services/withdraw.service";
import { mapWithdrawRequest } from "../mappers/withdraw.mapper";
import { success, error } from "../utils/apiResponse";

export const requestWithdraw = async (req: any, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = req.user.userId;

    const withdrawRequest =
      await WithdrawalService.requestWithdraw(userId, amount);

    return success(
      res,
      mapWithdrawRequest(withdrawRequest),
      "Withdraw request submitted",
      201
    );
  } catch (err: any) {
    const status =
      err.message === "Insufficient wallet balance" ? 400 : 500;

    return error(res, err.message, status);
  }
};
