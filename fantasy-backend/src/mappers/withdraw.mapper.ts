export const mapWithdrawRequest = (wr: any) => ({
    id: wr._id,
    amount: wr.amount,
    tdsAmount: wr.tdsAmount,
    netAmount: wr.netAmount,
    status: wr.status,
    createdAt: wr.createdAt
  });
  