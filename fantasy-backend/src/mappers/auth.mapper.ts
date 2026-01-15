import { permission } from "process";

export const mapAuthResponse = (user: any, token: string) => ({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      permission: user.permission
    }
  });
  