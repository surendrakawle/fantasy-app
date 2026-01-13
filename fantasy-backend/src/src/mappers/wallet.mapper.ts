export const mapWallet = (wallet: any) => ({
  balance: wallet.balance,
  bonusBalance: wallet.bonusBalance ?? 0,
  currency: wallet.currency || "INR",
  updatedAt: wallet.updatedAt
});
