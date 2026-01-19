import { Transaction } from "../models/Transaction.model";
import mongoose from "mongoose";

export class TransactionService {

  /* ---------- USER TRANSACTIONS ---------- */
  static async listUser(
    userId: string,
    filters: any,
    page = 1,
    limit = 20
  ) {
    const query: any = {
      userId: new mongoose.Types.ObjectId(userId)
    };

    if (filters.type) query.type = filters.type;
    if (filters.contest) query.contest = filters.contest;
    if (filters.prediction) query.prediction = filters.prediction;

    const skip = (page - 1) * limit;

    const [list, total] = await Promise.all([
      Transaction.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Transaction.countDocuments(query)
    ]);

    return {
      list,
      page,
      limit,
      total
    };
  }

  /* ---------- ADMIN TRANSACTIONS ---------- */
  static async listAll(
    filters: any,
    page = 1,
    limit = 50
  ) {
    const query: any = {};

    if (filters.userId) query.userId = filters.userId;
    if (filters.type) query.type = filters.type;

    const skip = (page - 1) * limit;

    const [list, total] = await Promise.all([
      Transaction.find(query)
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Transaction.countDocuments(query)
    ]);

    return {
      list,
      page,
      limit,
      total
    };
  }
}
