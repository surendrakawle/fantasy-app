export const mapPrediction = (prediction: any) => ({
    id: prediction._id,
    contestId: prediction.contestId,
    question: prediction.question,
    options: prediction.options,
    points: prediction.points,
    order: prediction.order,
    createdAt: prediction.createdAt
  });
  