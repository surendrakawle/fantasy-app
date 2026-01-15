import { Request, Response } from "express";
import { DepositService } from "../services/deposit.service";
import { success, error } from "../utils/ApiResponse";

/* -------- USER -------- */
export const createDepositRequest = async (req: any, res: Response) => {
  try {
    const { amount } = req.body;

    const deposit = await DepositService.createUserDeposit(
      req.user.userId,
      amount
    );

    return success(
      res,
      deposit,
      "Deposit request created",
      201
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* -------- ADMIN -------- */
export const approveUpiDeposit = async (req: any, res: Response) => {
  try {
    const deposit = await DepositService.approveUpiDeposit(
      req.params.id,
      req.body.utr,
      req.user.userId
    );

    return success(res, deposit, "Deposit approved");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const adminCashDeposit = async (req: any, res: Response) => {
  try {
    const { userId, amount } = req.body;

    const deposit = await DepositService.adminCashDeposit(
      userId,
      amount,
      req.user.userId
    );

    return success(res, deposit, "Cash deposited");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
