import { User } from "../models/User.model";

export class UserService {
  static async getMe(userId: string) {
    if (!userId) {
      throw new Error("User ID missing");
    }

    const user = await User.findById(userId)
      .populate("role", "name permissions")
      .lean(); // ✅ improves performance

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
  /* -------------------- ADMIN -------------------- */
  static async listUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find()
        .populate("role", "name")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      User.countDocuments()
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async updateUserByAdmin(userId: string, data: any) {
    const user = await User.findByIdAndUpdate(
      userId,
      data,
      { new: true }
    ).populate("role", "name");

    if (!user) throw new Error("User not found");
    return user;
  }

  /* -------------------- USER -------------------- */
  static async updateMyProfile(userId: string, data: any) {
    const allowed = {
      name: data.name
    };

    const user = await User.findByIdAndUpdate(
      userId,
      allowed,
      { new: true }
    ).populate("role", "name");

    if (!user) throw new Error("User not found");
    return user;
  }
}
