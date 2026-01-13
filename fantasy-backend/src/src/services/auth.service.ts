import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { Wallet } from "../models/Wallet.model";
import { Role } from "../models/Role.model";
import { verifyGoogleToken } from "./googleAuth.service";
import { env } from "../config/env";

export class AuthService {
  static async googleLogin(googleToken: string) {
    if (!googleToken) {
      throw new Error("Google token is required");
    }

    /* 1️⃣ Verify Google token */
    const payload = await verifyGoogleToken(googleToken);

    if (!payload?.email || !payload?.googleId) {
      throw new Error("Invalid Google token");
    }

    /* 2️⃣ Find or create user */
    let user = await User.findOne({ email: payload.email }).populate("role");

    if (!user) {
      const userRole = await Role.findOne({ name: "USER" });
      if (!userRole) {
        throw new Error("Default USER role not found");
      }

      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.googleId,
        authProvider: "google",
        role: userRole._id
      });

      await Wallet.create({ userId: user._id });
      user = await user.populate({path:"role", select:"name permissions"});
    }

    /* 3️⃣ Blocked user check */
    if (user.isBlocked) {
      throw new Error("User account is blocked");
    }

    /* 4️⃣ Issue JWT */
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role.name
      },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user, token };
  }
}
