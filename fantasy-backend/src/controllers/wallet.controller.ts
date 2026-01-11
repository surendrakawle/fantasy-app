import { Request, Response } from "express";
import { Wallet } from "../models/Wallet.model";
import { Transaction } from "../models/Transaction.model";

export const getBalance = async (req: any, res: Response) => {
  const wallet = await Wallet.findOne({ userId: req.user.userId });
  res.json(wallet);
};

export const getTransactions = async (req: any, res: Response) => {
  const txns = await Transaction.find({ userId: req.user.userId })
    .sort({ createdAt: -1 });
  res.json(txns);
};
