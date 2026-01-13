import { z } from "zod";

export const submitPredictionSchema = z.object({
  contestId: z.string().length(24),
  predictionId: z.string().length(24),
  selectedAnswer: z.string().min(1)
});
