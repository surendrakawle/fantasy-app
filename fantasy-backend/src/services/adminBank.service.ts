import { UserBankAccount } from "../models/UserBankAccount.model";

export class AdminBankService {
  static async approveBank(
    bankId: string,
    adminUserId: string
  ) {
    const bank = await UserBankAccount.findByIdAndUpdate(
      bankId,
      {
        isVerified: true,
        "verification.status": "VERIFIED",
        "verification.verifiedAt": new Date()
      },
      { new: true }
    );

    if (!bank) {
      throw new Error("Bank account not found");
    }

    return bank;
  }

  static async rejectBank(
    bankId: string,
    adminUserId: string,
    reason?: string
  ) {
    const bank = await UserBankAccount.findByIdAndUpdate(
      bankId,
      {
        isVerified: false,
        "verification.status": "FAILED",
        "verification.reason": reason || "Rejected by admin"
      },
      { new: true }
    );

    if (!bank) {
      throw new Error("Bank account not found");
    }

    return bank;
  }
}
