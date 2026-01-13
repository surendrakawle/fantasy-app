import { AdminAuditLog } from "../models/AdminAuditLog.model";

export const logAdminAction = async ({
  adminId,
  action,
  entity,
  entityId,
  payload
}: {
  adminId: string;
  action: string;
  entity: string;
  entityId?: string;
  payload?: any;
}) => {
  try {
    await AdminAuditLog.create({
      adminId,
      action,
      entity,
      entityId,
      payload
    });
  } catch (err) {
    console.error("Audit log failed:", err);
  }
};
