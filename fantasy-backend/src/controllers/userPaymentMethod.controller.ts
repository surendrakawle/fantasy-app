import { Request, Response } from "express";
import { PaymentMethodService } from "../services/paymentMethod.service";
import { mapPaymentMethod } from "../mappers/paymentMethod.mapper";
import { success, error } from "../utils/ApiResponse";

export const listMyPaymentMethods = async (req: any, res: Response) => {
  const methods = await PaymentMethodService.listByUser(req.user.userId);
  return success(res, methods.map(mapPaymentMethod));
};

export const addMyPaymentMethod = async (req: any, res: Response) => {
  const method = await PaymentMethodService.create(
    req.user.userId,
    req.body
  );
  return success(res, mapPaymentMethod(method), "Payment method added");
};

export const updateMyPaymentMethod = async (req: any, res: Response) => {
  const method = await PaymentMethodService.update(
    req.params.id,
    req.user.userId,
    req.body
  );
  return success(res, mapPaymentMethod(method));
};

export const removeMyPaymentMethod = async (req: any, res: Response) => {
  await PaymentMethodService.remove(req.params.id, req.user.userId);
  return success(res, null, "Payment method removed");
};
