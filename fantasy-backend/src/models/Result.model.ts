import { Schema, model, Types } from "mongoose";

export interface IResult {
  contestId: Types.ObjectId;
  userId: Types.ObjectId;
  totalPoints: number;
  rank: number;
  winningAmount: number;
  credited: boolean;
}

const schema = new Schema<IResult>({
  contestId: { type: Schema.Types.ObjectId, ref: "Contest", index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  totalPoints: Number,
  rank: Number,
  winningAmount: { type: Number, default: 0 },
  credited: { type: Boolean, default: false }
});

export const Result = model<IResult>("Result", schema);
