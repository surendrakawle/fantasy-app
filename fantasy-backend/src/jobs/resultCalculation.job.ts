import { Prediction } from "../models/Prediction.model";
import { UserPrediction } from "../models/UserPrediction.model";
import { Result } from "../models/Result.model";

export async function calculateResults(contestId: string) {
  const answers = await UserPrediction.find({ contestId });

  for (const ans of answers) {
    const q = await Prediction.findById(ans.predictionId);
    if (!q) continue;

    ans.isCorrect = ans.selectedAnswer === q.correctAnswer;
    ans.pointsEarned = ans.isCorrect ? q.points : 0;
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
