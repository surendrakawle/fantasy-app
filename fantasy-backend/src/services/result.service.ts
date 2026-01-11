import { UserPrediction } from "../models/UserPrediction.model";
import { Prediction } from "../models/Prediction.model";
import { Result } from "../models/Result.model";

export async function calculateContestResult(contestId: string) {
  const userAnswers = await UserPrediction.find({ contestId });

  for (const ans of userAnswers) {
    const question = await Prediction.findById(ans.predictionId);
    if (!question) continue;

    ans.isCorrect = ans.selectedAnswer === question.correctAnswer;
    ans.pointsEarned = ans.isCorrect ? question.points : 0;
    await ans.save();
  }

  const leaderboard = await UserPrediction.aggregate([
    { $match: { contestId } },
    {
      $group: {
        _id: "$userId",
        totalPoints: { $sum: "$pointsEarned" }
      }
    },
    { $sort: { totalPoints: -1 } }
  ]);

  let rank = 1;
  for (const user of leaderboard) {
    await Result.create({
      contestId,
      userId: user._id,
      totalPoints: user.totalPoints,
      rank,
      winningAmount: rank === 1 ? 1000 : 0
    });
    rank++;
  }
}
