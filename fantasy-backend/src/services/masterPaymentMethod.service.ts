import { MasterPaymentMethod } from "../models/MasterPaymentMethod.model";

export class MasterPaymentMethodService {
  /* ---------- PUBLIC (FOR USERS) ---------- */
  static async listActive(type?: "BANK" | "UPI") {
    const filter: any = { isActive: true };
    if (type) filter.type = type;

    return MasterPaymentMethod.find(filter)
      .sort({ createdAt: -1 })
      .lean();
  }

  /* ---------- ADMIN ---------- */
  static async create(data: any) {
    return MasterPaymentMethod.create(data);
  }

  static async update(id: string, data: any) {
    const updated = await MasterPaymentMethod.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updated) throw new Error("Payment method not found");
    return updated;
  }

  static async deactivate(id: string) {
    const updated = await MasterPaymentMethod.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!updated) throw new Error("Payment method not found");
    return updated;
  }
}
