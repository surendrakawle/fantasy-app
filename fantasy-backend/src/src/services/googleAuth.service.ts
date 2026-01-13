import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token?: string) {
  if (!token) {
    throw new Error("Google token is required");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email_verified) {
      throw new Error("Invalid Google account");
    }

    return {
      googleId: payload.sub!,
      email: payload.email!,
      name: payload.name,
      picture: payload.picture
    };
  } catch {
    throw new Error("Invalid or expired Google token");
  }
}
