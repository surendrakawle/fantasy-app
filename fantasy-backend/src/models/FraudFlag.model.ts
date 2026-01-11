import { Schema, model, Types } from "mongoose";

export interface IFraudFlag {
  userId: Types.ObjectId;
  reason: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  resolved: boolean;
  createdAt: Date;
}

const schema = new Schema<IFraudFlag>({
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  reason: String,
  severity: { type: String, default: "LOW" },
  resolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const FraudFlag = model<IFraudFlag>("FraudFlag", schema);
