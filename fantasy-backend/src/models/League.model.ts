import { Schema, model, Types } from "mongoose";

export interface ILeague {
  _id: Types.ObjectId;
  name: string;           // IPL 2025
  shortName: string;      // IPL
  sport: "CRICKET";       // future-proof
  season: string;         // 2025
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LeagueSchema = new Schema<ILeague>(
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
    
    image: {
        type: String,
        required: false,
    },

    sport: {
      type: String,
      enum: ["CRICKET"],
      default: "CRICKET"
    },

    season: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

LeagueSchema.index({ isActive: 1 });

export const League = model<ILeague>("League", LeagueSchema);
