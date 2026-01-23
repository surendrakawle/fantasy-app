import { Request, Response } from "express";
import { WalletService } from "../services/wallet.service";
import { success, error } from "../utils/ApiResponse";
import { mapWallet } from "../mappers/wallet.mapper";
import { mapTransaction } from "../mappers/transaction.mapper";

/* -------------------- USER WALLET -------------------- */

/**
 * Get own wallet balance
 */
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

/**
 * Get own wallet transactions
 */
export const getTransactions = async (req: any, res: Response) => {
  try {
    const transactions = await WalletService.getTransactions(
      req.user.userId
    );

    return success(
      res,
      transactions.map(mapTransaction),
      "Transactions fetched"
    );
  } catch (err: any) {
    return error(res, err.message, 500);
  }
};

/* -------------------- ADMIN WALLET -------------------- */

/**
 * Get wallet balance of ANY user (Admin)
 */
export const getUserWalletBalanceAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const wallet = await WalletService.getBalance(userId);

    return success(
      res,
      mapWallet(wallet),
      "Wallet balance fetched"
    );
  } catch (err: any) {
    return error(res, err.message, 404);
  }
};

/**
 * Get wallet transactions of ANY user (Admin)
 */
export const getUserWalletTransactionsAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const transactions = await WalletService.getTransactions(userId);

    return success(
      res,
      transactions.map(mapTransaction),
      "Wallet transactions fetched"
    );
  } catch (err: any) {
    return error(res, err.message, 500);
  }
};
