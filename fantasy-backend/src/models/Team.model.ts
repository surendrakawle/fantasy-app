import { Schema, model, Types } from "mongoose";

export interface ITeam {
  _id: Types.ObjectId;

  name: string;          // India
  shortName: string;     // IND
  code: string;          // IND / PAK / CSK
  logoBase64?: string;   // Base64 PNG/JPEG

  sport: "CRICKET";
  isNational: boolean;   // true = India, false = CSK
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    shortName: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      unique: true
    },

    logoBase64: {
      type: String
    },

    sport: {
      type: String,
      enum: ["CRICKET"],
      default: "CRICKET"
    },

    isNational: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

TeamSchema.index({ code: 1 });
TeamSchema.index({ isActive: 1 });

export const Team = model<ITeam>("Team", TeamSchema);
