import { Request, Response } from "express";
import { WalletService } from "../services/wallet.service";
import { success, error } from "../utils/ApiResponse";
import { mapWallet } from "../mappers/wallet.mapper";
import { mapTransaction } from "../mappers/transaction.mapper";

/* -------------------- GET WALLET BALANCE -------------------- */
export const getBalance = async (req: any, res: Response) => {
  try {
    const wallet = await WalletService.getBalance(req.user.userId);

    return success(
      res,
      mapWallet(wallet),
      "Wallet balance fetched"
    );
  } catch (err: any) {
    return error(res, err.message, 404);
  }
};

/* -------------------- GET WALLET TRANSACTIONS -------------------- */
export const getTransactions = async (req: any, res: Response) => {
  try {
    const transactions =
      await WalletService.getTransactions(req.user.userId);

    return success(
      res,
      transactions.map(mapTransaction),
      "Transactions fetched"
    );
  } catch (err: any) {
    return error(res, err.message);
  }
};
