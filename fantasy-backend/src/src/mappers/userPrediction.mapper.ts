export const mapUserPrediction = (up: any) => ({
    id: up._id,
    contestId: up.contestId,
    predictionId: up.predictionId,
    selectedAnswer: up.selectedAnswer,
    createdAt: up.createdAt
  });
  