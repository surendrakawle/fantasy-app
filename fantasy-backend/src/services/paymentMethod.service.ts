import { UserPaymentMethod } from "../models/UserPaymentMethod.model";

export class PaymentMethodService {
  static async listByUser(userId: string) {
    return UserPaymentMethod.find({
      userId,
      isActive: true,
    }).sort({ isPrimary: -1, createdAt: -1 });
  }

  static async create(userId: string, payload: any) {
    if (!payload?.type) {
      throw new Error("Payment method type is required");
    }

    if (payload.isPrimary) {
      await UserPaymentMethod.updateMany(
        { userId, isPrimary: true },
        { isPrimary: false }
      );
    }

    return UserPaymentMethod.create({
      ...payload,
      userId,
    });
  }

  static async update(id: string, userId: string, payload: any) {
    if (payload.isPrimary) {
      await UserPaymentMethod.updateMany(
        { userId, isPrimary: true },
        { isPrimary: false }
      );
    }

    const updated = await UserPaymentMethod.findOneAndUpdate(
      { _id: id, userId, isActive: true },
      payload,
      { new: true }
    );

    if (!updated) {
      throw new Error("Payment method not found");
    }

    return updated;
  }

  static async remove(id: string, userId: string) {
    const removed = await UserPaymentMethod.findOneAndUpdate(
      { _id: id, userId, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!removed) {
      throw new Error("Payment method not found");
    }

    return removed;
  }
}
