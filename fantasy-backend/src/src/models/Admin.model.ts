import { Schema, model, Types } from "mongoose";

export interface IAdmin {
  userId: Types.ObjectId;
  role: "ADMIN" | "MODERATOR";
  createdAt: Date;
}

const adminSchema = new Schema<IAdmin>({
  userId: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  role: { type: String, default: "ADMIN" },
  createdAt: { type: Date, default: Date.now }
});

export const Admin = model<IAdmin>("Admin", adminSchema);
