import { z } from "zod";

export const joinContestSchema = z.object({
  id: z.string().length(24)
});
