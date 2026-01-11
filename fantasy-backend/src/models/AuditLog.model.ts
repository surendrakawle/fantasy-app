import { Schema, model, Types } from "mongoose";

export interface IAuditLog {
  userId?: Types.ObjectId;
  action: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
}

const schema = new Schema<IAuditLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  action: String,
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
});

export const AuditLog = model<IAuditLog>("AuditLog", schema);
