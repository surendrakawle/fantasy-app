export type ContestType = "PREDICTION" | "TEAM";

export interface SettlementStats {
  contestId: string;
  contestType: ContestType;
  status: "OPEN" | "LOCKED" | "COMPLETED";

  totalEntries: number;
  totalAmount: number;

  /* PREDICTION */
  totalWin?: number;
  profit?: number;

  /* TEAM */
  joinedUsers?: number;
  entryFee?: number;
  prizePool?: number;
  platformMargin?: number;
}
