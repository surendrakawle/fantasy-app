import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { mapUser } from "../mappers/user.mapper";
import { success, error } from "../utils/ApiResponse";

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await UserService.getMe(req.user.userId);

    return success(
      res,
      mapUser(user),
      "User profile fetched"
    );
  } catch (err: any) {
    return error(
      res,
      err.message,
      err.message === "User not found" ? 404 : 401
    );
  }
};

/* -------------------- ADMIN -------------------- */
export const listUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const { users, pagination } =
      await UserService.listUsers(page, limit);

    return success(
      res,
      { users: users.map(mapUser), pagination },
      "Users fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

export const updateUserAdmin = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUserByAdmin(
      req.params.id,
      req.body
    );
    return success(res, mapUser(user), "User updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* -------------------- USER -------------------- */
export const updateMyProfile = async (req: any, res: Response) => {
  try {
    const user = await UserService.updateMyProfile(
      req.user.userId,
      req.body
    );
    return success(res, mapUser(user), "Profile updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

