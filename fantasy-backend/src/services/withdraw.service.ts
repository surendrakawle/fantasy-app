export function calculateTDS(amount: number) {
    const TDS_RATE = 0.3; // 30%
    const tds = amount * TDS_RATE;
    return {
      tdsAmount: tds,
      netAmount: amount - tds
    };
  }
  