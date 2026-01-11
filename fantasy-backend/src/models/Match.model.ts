import { Schema, model } from "mongoose";

export interface IMatch {
  sport: string;
  teamA: string;
  teamB: string;
  startTime: Date;
  status: "UPCOMING" | "LIVE" | "COMPLETED";
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

export const Match = model<IMatch>("Match", matchSchema);
