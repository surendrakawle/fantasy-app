import { UserBankAccount } from "../models/UserBankAccount.model";
import { BankVerificationService } from "./bankVerification.service";


export class UserBankAccountService {
  static async list(userId: string) {
    return UserBankAccount.find({
      userId,
      isActive: true
    }).lean();
  }

  static async add(userId: string, data: any) {
    if (data.isPrimary) {
      await UserBankAccount.updateMany(
        { userId },
        { isPrimary: false }
      );
    }

    return UserBankAccount.create({
      ...data,
      userId
    });
  }

  static async remove(userId: string, id: string) {
    const acc = await UserBankAccount.findOneAndUpdate(
      { _id: id, userId },
      { isActive: false },
      { new: true }
    );

    if (!acc) throw new Error("Bank account not found");
    return acc;
  }
  static async verifyBank(bankId: string) {
    const bank = await UserBankAccount.findById(bankId);
    if (!bank) throw new Error("Bank not found");
  
    const result = await BankVerificationService.pennyDrop(bank);
  
    bank.verification = {
      status: result.success ? "VERIFIED" : "FAILED",
      verifiedAt: new Date(),
      referenceId: result.referenceId
    };
  
    return bank.save();
  }
}
