import { Schema, model, Types } from "mongoose";

export interface IContestParticipant {
  contestId: Types.ObjectId;
  userId: Types.ObjectId;
  joinedAt: Date;
}

const schema = new Schema<IContestParticipant>({
  contestId: { type: Schema.Types.ObjectId, ref: "Contest", index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  joinedAt: { type: Date, default: Date.now }
});

schema.index({ contestId: 1, userId: 1 }, { unique: true });

export const ContestParticipant = model<IContestParticipant>(
  "ContestParticipant",
  schema
);
