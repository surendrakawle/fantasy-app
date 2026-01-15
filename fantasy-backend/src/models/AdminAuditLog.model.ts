import { Schema, model, Types } from "mongoose";

export interface IAdminAuditLog {
  adminId: Types.ObjectId;
  action: string;
  entity: string;
  entityId?: string;
  payload?: any;
  createdAt: Date;
}

const schema = new Schema<IAdminAuditLog>({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: String,
  payload: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

export const AdminAuditLog = model<IAdminAuditLog>(
  "AdminAuditLog",
  schema
);
