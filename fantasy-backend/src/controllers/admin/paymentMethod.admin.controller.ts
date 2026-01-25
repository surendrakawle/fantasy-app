import { Request, Response } from "express";
import { PaymentMethodService } from "../../services/paymentMethod.service";
import { mapPaymentMethod } from "../../mappers/paymentMethod.mapper";
import { success, error } from "../../utils/ApiResponse";

export const listUserPaymentMethodsAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const methods = await PaymentMethodService.listByUser(req.params.userId);
    return success(res, methods.map(mapPaymentMethod));
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};
