import { User } from "../models/User.model";

export class ForgotPinService {

  static async sendOtp(email: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.pinResetOtp = otp;
    user.pinResetExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.save();

    // 🔥 HERE SEND MAIL
    console.log(`OTP for ${email} = ${otp}`);

    return true;
  }

  /* ---------- VERIFY OTP & RESET PIN ---------- */
  static async resetPin(email: string, otp: string, newPin: string) {
    const user = await User.findOne({ email }).select("+pinResetOtp +pinResetExpiry");

    if (!user) throw new Error("User not found");

    if (
      !user.pinResetOtp ||
      user.pinResetOtp !== otp ||
      !user.pinResetExpiry ||
      user.pinResetExpiry < new Date()
    ) {
      throw new Error("Invalid or expired OTP");
    }

    user.pin = newPin;
    user.pinSet = true;

    user.pinResetOtp = undefined;
    user.pinResetExpiry = undefined;

    await user.save();
    return user;
  }
}
