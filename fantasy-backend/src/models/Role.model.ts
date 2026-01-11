import { Schema, model } from "mongoose";

export interface IRole {
  name: "ADMIN" | "MODERATOR" | "USER";
  permissions: string[];
  isSystem: boolean;
  createdAt: Date;
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    enum: ["ADMIN", "MODERATOR", "USER"],
    unique: true,
    required: true
  },
  permissions: {
    type: [String],
    default: []
  },
  isSystem: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Role = model<IRole>("Role", roleSchema);
