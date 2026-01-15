import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { success, error } from "../utils/apiResponse";
import {WithdrawalAdminService} from "../services/withdrawal.admin.service";
import {
  mapMatch,
  mapContest,
  mapPrediction
} from "../mappers/admin.mapper";

/* -------------------- CREATE MATCH -------------------- */
export const createMatch = async (req: Request, res: Response) => {
  try {
    const match = await AdminService.createMatch(req.body);
    return success(res, mapMatch(match), "Match created", 201);
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};

/* -------------------- CREATE CONTEST -------------------- */
export const createContest = async (req: Request, res: Response) => {
  try {
    const contest = await AdminService.createContest(req.body);
    return success(res, mapContest(contest), "Contest created", 201);
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};

/* -------------------- CREATE PREDICTION -------------------- */
export const createPrediction = async (req: Request, res: Response) => {
  try {
    const prediction = await AdminService.createPrediction(req.body);
    return success(
      res,
      mapPrediction(prediction),
      "Prediction created",
      201
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};

/* -------------------- PUBLISH RESULT -------------------- */
export const publishResult = async (req: Request, res: Response) => {
  try {
    await AdminService.publishResult(req.body.contestId);
    return success(res, null, "Result job queued");
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};

export const approveWithdraw = async (req: any, res: any) => {
  try {
    const wr = await WithdrawalAdminService.approve(
      req.params.id,
      req.user.userId
    );
    return success(res, wr, "Withdrawal approved");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const rejectWithdraw = async (req: any, res: any) => {
  try {
    const wr = await WithdrawalAdminService.reject(
      req.params.id,
      req.user.userId,
      req.body.reason
    );
    return success(res, wr, "Withdrawal rejected");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

