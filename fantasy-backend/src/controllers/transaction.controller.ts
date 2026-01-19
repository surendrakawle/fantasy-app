import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { mapTransaction } from "../mappers/transaction.mapper";
import { success, error } from "../utils/ApiResponse";

/* ================= USER ================= */

export const myTransactions = async (req: any, res: Response) => {
  try {
    const { type, contest, prediction, page = 1, limit = 20 } = req.query;

    const data = await TransactionService.listUser(
      req.user.userId,
      { type, contest, prediction },
      Number(page),
      Number(limit)
    );

    return success(res, {
      ...data,
      list: data.list.map(mapTransaction)
    });
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ================= ADMIN ================= */

export const allTransactions = async (req: Request, res: Response) => {
  try {
    const { userId, type, page = 1, limit = 50 } = req.query;

    const data = await TransactionService.listAll(
      { userId, type },
      Number(page),
      Number(limit)
    );

    return success(res, {
      ...data,
      list: data.list.map(mapTransaction)
    });
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
