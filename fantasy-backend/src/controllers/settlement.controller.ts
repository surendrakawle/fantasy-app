import { Request, Response } from "express";
import { SettlementService } from "../services/settlement.service";
import { success, error } from "../utils/ApiResponse";

/* ================= PREVIEW SETTLEMENT ================= */
export const previewSettlement = async (
  req: Request,
  res: Response
) => {
  try {
    const { contestId } = req.params;

    const stats =
      await SettlementService.getStats(contestId);

    return success(
      res,
      stats,
      "Settlement stats fetched"
    );
  } catch (err: any) {
    return error(
      res,
      err.message || "Failed to fetch settlement stats",
      400
    );
  }
};

/* ================= PREDICTION SETTLEMENT ================= */
export const settlePrediction = async (
  req: Request,
  res: Response
) => {
  try {
    const { contestId } = req.params;

    const stats =
      await SettlementService.settlePredictionContest(
        contestId
      );

    return success(
      res,
      stats,
      "Prediction contest settled successfully"
    );
  } catch (err: any) {
    return error(
      res,
      err.message || "Prediction settlement failed",
      400
    );
  }
};

/* ================= TEAM SETTLEMENT ================= */
export const settleTeam = async (
  req: Request,
  res: Response
) => {
  try {
    const { contestId } = req.params;

    const stats =
      await SettlementService.settleTeamContest(
        contestId
      );

    return success(
      res,
      stats,
      "Team contest settled successfully"
    );
  } catch (err: any) {
    return error(
      res,
      err.message || "Team settlement failed",
      400
    );
  }
};
