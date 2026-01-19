import { Schema, model } from "mongoose";

export interface IApiIngest {
  apiName: string;          // cricketdata, rapidapi, sportmonks
  endpoint: string;        // /matches/upcoming, /players, etc

  requestAt: Date;         // when API was called
  response: any;          // full raw JSON response

  success: boolean;
  error?: string;

  createdAt: Date;
}

const schema = new Schema<IApiIngest>({
  apiName: {
    type: String,
    required: true,
    index: true
  },

  endpoint: {
    type: String,
    required: true
  },

  requestAt: {
    type: Date,
    required: true,
    index: true
  },

  response: {
    type: Schema.Types.Mixed,   // store full JSON
    required: true
  },

  success: {
    type: Boolean,
    default: true
  },

  error: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

/* Helpful indexes */
schema.index({ apiName: 1, endpoint: 1, requestAt: -1 });

export const ApiIngest = model<IApiIngest>("ApiIngest", schema);
