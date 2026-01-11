import { Request, Response } from "express";
import { WithdrawRequest } from "../models/WithdrawRequest.model";
import { Wallet } from "../models/Wallet.model";
import { fraudQueue } from "../queues/fraud.queue";

export const requestWithdraw = async (req: any, res: Response) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ userId: req.user.userId });
  if (!wallet || wallet.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const tds = amount * 0.3; // example 30%
  const net = amount - tds;

  await WithdrawRequest.create({
    userId: req.user.userId,
    amount,
    tdsAmount: tds,
    netAmount: net
  });

  await fraudQueue.add("fraud-check", {
    userId: req.user.userId,
    fastWithdraw: true
  });

  res.json({ message: "Withdraw request submitted" });
};
