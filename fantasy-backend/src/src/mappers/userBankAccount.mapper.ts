export const mapUserBankAccount = (doc: any) => ({
    id: doc._id,
    bankName: doc.bankName,
    accountName: doc.accountName,
    accountNumber: doc.accountNumber.replace(/\d(?=\d{4})/g, "*"),
    ifsc: doc.ifsc,
    isVerified: doc.isVerified,
    isPrimary: doc.isPrimary
  });
  