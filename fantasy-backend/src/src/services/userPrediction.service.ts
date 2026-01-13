import { UserPrediction } from "../models/UserPrediction.model";

export class UserPredictionService {
  static async getUserPredictionsByContest(
    userId: string,
    contestId: string
  ) {
    return UserPrediction.aggregate([
      {
        $match: {
          userId,
          contestId
        }
      },
      {
        $lookup: {
          from: "predictions",
          localField: "predictionId",
          foreignField: "_id",
          as: "prediction"
        }
      },
      { $unwind: "$prediction" },
      {
        $sort: {
          "prediction.order": 1
        }
      }
    ]);
  }
}
