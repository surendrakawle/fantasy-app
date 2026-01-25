import { Response } from "express";
import { PaymentMethodService } from "../services/paymentMethod.service";
import { mapPaymentMethod } from "../mappers/paymentMethod.mapper";
import { success, error } from "../utils/ApiResponse";

export const listMyPaymentMethods = async (req: any, res: Response) => {
  try {
    const methods = await PaymentMethodService.listByUser(req.user.userId);
    return success(res, methods.map(mapPaymentMethod));
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

export const addMyPaymentMethod = async (req: any, res: Response) => {
  try {
    const method = await PaymentMethodService.create(
      req.user.userId,
      req.body
    );
    return success(res, mapPaymentMethod(method), "Payment method added");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const updateMyPaymentMethod = async (req: any, res: Response) => {
  try {
    const method = await PaymentMethodService.update(
      req.params.id,
      req.user.userId,
      req.body
    );
    return success(res, mapPaymentMethod(method), "Payment method updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const removeMyPaymentMethod = async (req: any, res: Response) => {
  try {
    await PaymentMethodService.remove(req.params.id, req.user.userId);
    return success(res, null, "Payment method removed");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
