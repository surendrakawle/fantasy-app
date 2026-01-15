import { Request, Response } from "express";
import { AdminBankService } from "../services/adminBank.service";
import { success, error } from "../utils/apiResponse";
import { mapUserBankAccount } from "../mappers/userBankAccount.mapper";

export const approveUserBank = async (req: any, res: Response) => {
  try {
    const bank = await AdminBankService.approveBank(
      req.params.id,
      req.user.userId
    );

    return success(
      res,
      mapUserBankAccount(bank),
      "Bank approved successfully"
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const rejectUserBank = async (req: any, res: Response) => {
  try {
    const bank = await AdminBankService.rejectBank(
      req.params.id,
      req.user.userId,
      req.body.reason
    );

    return success(
      res,
      mapUserBankAccount(bank),
      "Bank rejected successfully"
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
