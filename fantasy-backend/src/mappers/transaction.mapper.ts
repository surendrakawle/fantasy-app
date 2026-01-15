export const mapTransaction = (txn: any) => ({
    id: txn._id,
    type: txn.type,               // CREDIT / DEBIT
    amount: txn.amount,
    reason: txn.reason,           // ENTRY_FEE / WINNING / REFUND
    status: txn.status,           // SUCCESS / FAILED / PENDING
    referenceId: txn.referenceId, // contestId / payoutId
    createdAt: txn.createdAt
  });