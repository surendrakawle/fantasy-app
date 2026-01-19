import mongoose, { Schema, Document } from "mongoose";

export interface IMatch extends Document {
  sport: string;
  teamA: string;
  teamB: string;
  startTime: Date;
  status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED";
  resultProcessed: boolean;
  createdAt: Date;
}

const matchSchema = new Schema<IMatch>({
  sport: { type: String, default: "CRICKET" },
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  startTime: { type: Date, required: true },
  status: { type: String, default: "UPCOMING", index: true },
  resultProcessed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Match = mongoose.model<IMatch>("Match", matchSchema);
