import { User } from "../models/User.model";

export class PinService {

  /* ---------- SET PIN ---------- */
  static async setPin(userId: string, pin: string) {
    if (!/^\d{4,6}$/.test(pin)) {
      throw new Error("PIN must be 4 to 6 digits");
    }

    const user = await User.findById(userId).select("+pin");
    if (!user) throw new Error("User not found");

    user.pin = pin;
    user.pinSet = true;

    await user.save();
    return user;
  }

  /* ---------- LOGIN WITH PIN ---------- */
  static async loginWithPin(email: string, pin: string) {
    const user = await User.findOne({ email }).select("+pin");

    if (!user) throw new Error("User not found");
    if (user.isBlocked) throw new Error("Account blocked");

    const ok = await user.comparePin(pin);
    if (!ok) throw new Error("Invalid PIN");

    user.lastLoginAt = new Date();
    await user.save();

    return user;
  }
}
