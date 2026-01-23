import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;

  // Basic profile
  name: string;
  email: string;
  googleId: string;
  authProvider: "google";

  // Role & access
  role: Types.ObjectId; // Reference to Role collection
  isBlocked: boolean;

  // Audit
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  profileImageUrl?: String;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      // unique: true,
      // index: true,
      lowercase: true
    },

    googleId: {
      type: String,
      required: true,
      // index: true
    },

    authProvider: {
      type: String,
      enum: ["google"],
      default: "google"
    },

    // 🔐 RBAC
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      index: true
    },

    // 🚫 Account control
    isBlocked: {
      type: Boolean,
      default: false
    },

    profileImageUrl: {
      type: String,
      trim: true
    },

    // 🕒 Audit fields
    lastLoginAt: {
      type: Date
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

// 🔍 Helpful indexes
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ role: 1, isBlocked: 1 });

export const User = model<IUser>("User", userSchema);
