import { Request, Response } from "express";
import { MasterPaymentMethodService } from "../services/masterPaymentMethod.service";
import { mapMasterPaymentMethod } from "../mappers/masterPaymentMethod.mapper";
import { success, error } from "../utils/ApiResponse";

/* -------- PUBLIC -------- */
export const listPaymentMethods = async (req: Request, res: Response) => {
  try {
    const methods =
      await MasterPaymentMethodService.listActive(
        req.query.type as any
      );

    return success(
      res,
      methods.map(mapMasterPaymentMethod),
      "Payment methods fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

/* -------- ADMIN -------- */
export const createPaymentMethod = async (req: Request, res: Response) => {
  try {
    const method = await MasterPaymentMethodService.create(req.body);
    return success(
      res,
      mapMasterPaymentMethod(method),
      "Payment method created",
      201
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const updatePaymentMethod = async (req: Request, res: Response) => {
  try {
    const method =
      await MasterPaymentMethodService.update(
        req.params.id,
        req.body
      );

    return success(
      res,
      mapMasterPaymentMethod(method),
      "Payment method updated"
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const deactivatePaymentMethod = async (
  req: Request,
  res: Response
) => {
  try {
    const method =
      await MasterPaymentMethodService.deactivate(req.params.id);

    return success(
      res,
      mapMasterPaymentMethod(method),
      "Payment method deactivated"
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
