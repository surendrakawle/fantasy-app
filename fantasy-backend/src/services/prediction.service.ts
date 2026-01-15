import { UserPrediction } from "../models/UserPrediction.model";
import { Prediction } from "../models/Prediction.model";
import { Contest } from "../models/Contest.model";

export class PredictionService {
  static async submitPrediction(params: {
    userId: string;
    contestId: string;
    predictionId: string;
    selectedAnswer: string;
  }) {
    const { userId, contestId, predictionId, selectedAnswer } = params;

    /* -------------------- Validations -------------------- */
    if (!contestId || !predictionId || !selectedAnswer) {
      throw new Error("Missing required fields");
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      throw new Error("Contest not found");
    }

    if (contest.status !== "OPEN") {
      throw new Error("Predictions are locked for this contest");
    }

    const prediction = await Prediction.findById(predictionId);
    if (!prediction || prediction.contestId.toString() !== contestId) {
      throw new Error("Invalid prediction");
    }

    if (!prediction.options.includes(selectedAnswer)) {
      throw new Error("Invalid prediction answer");
    }

    /* -------------------- Prevent duplicate submission -------------------- */
    const alreadySubmitted = await UserPrediction.findOne({
      userId,
      contestId,
      predictionId
    });

    if (alreadySubmitted) {
      throw new Error("Prediction already submitted");
    }

    /* -------------------- Save prediction -------------------- */
    return UserPrediction.create({
      userId,
      contestId,
      predictionId,
      selectedAnswer
    });
  }
  static async getByContestId(
    contestId: string,
    page = 1,
    limit = 50
  ) {
    const skip = (page - 1) * limit;

    const [predictions, total] = await Promise.all([
      Prediction.find({ contestId })
        .sort({ order: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Prediction.countDocuments({ contestId })
    ]);

    return {
      predictions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
