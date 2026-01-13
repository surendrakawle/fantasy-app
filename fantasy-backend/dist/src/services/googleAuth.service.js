"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = verifyGoogleToken;
const google_auth_library_1 = require("google-auth-library");
const env_1 = require("../config/env");
const client = new google_auth_library_1.OAuth2Client(env_1.env.GOOGLE_CLIENT_ID);
async function verifyGoogleToken(token) {
    if (!token) {
        throw new Error("Google token is required");
    }
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: env_1.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email_verified) {
            throw new Error("Invalid Google account");
        }
        return {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };
    }
    catch {
        throw new Error("Invalid or expired Google token");
    }
}
