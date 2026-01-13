export class BankVerificationService {
    static async pennyDrop(bank: any) {
      // 🔴 Replace with real API (Cashfree/Razorpay)
      return {
        success: true,
        referenceId: "PD_" + Date.now()
      };
    }
  }
  