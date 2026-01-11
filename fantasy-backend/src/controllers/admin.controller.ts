import { Request, Response } from "express";
import { Match } from "../models/Match.model";
import { Contest } from "../models/Contest.model";
import { Prediction } from "../models/Prediction.model";
import { resultQueue } from "../queues/result.queue";

export const createMatch = async (req: Request, res: Response) => {
  const match = await Match.create(req.body);
  res.json(match);
};

export const createContest = async (req: Request, res: Response) => {
  const contest = await Contest.create(req.body);
  res.json(contest);
};

export const createPrediction = async (req: Request, res: Response) => {
  const prediction = await Prediction.create(req.body);
  res.json(prediction);
};

export const publishResult = async (req: Request, res: Response) => {
  const { contestId } = req.body;

  await resultQueue.add(
    "calculate-result",
    { contestId },
    { jobId: `result-${contestId}` }
  );

  res.json({ message: "Result job queued" });
};
