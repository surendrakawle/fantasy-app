import { ITransaction } from "../models/Transaction.model";

export const mapTransaction = (t: ITransaction) => ({
  id: t._id,

  userId: t.userId,

  type: t.type,

  contest: t.contest,
  prediction: t.prediction,
  deposit: t.deposit,
  withdraw: t.withdraw,

  amount: t.amount,
  reason: t.reason,

  createdAt: t.createdAt
});
