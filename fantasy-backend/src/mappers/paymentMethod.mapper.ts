export const mapPaymentMethod = (p: any) => ({
    id: p._id,
    type: p.type,
  
    bank:
      p.type === "BANK"
        ? {
            bankName: p.bankName,
            accountName: p.accountName,
            accountNumber: p.accountNumber
              ? `****${p.accountNumber.slice(-4)}`
              : null,
            ifsc: p.ifsc,
          }
        : null,
  
    upi:
      p.type === "UPI"
        ? {
            upiId: p.upiId,
          }
        : null,
  
    wallet:
      p.type === "WALLET"
        ? {
            provider: p.provider,
            phoneNumber: p.phoneNumber
              ? `****${p.phoneNumber.slice(-4)}`
              : null,
          }
        : null,
  
    isPrimary: p.isPrimary,
    isActive: p.isActive,
    verification: p.verification,
    createdAt: p.createdAt,
  });
  