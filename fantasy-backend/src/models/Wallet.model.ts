import { Schema, model, Types } from "mongoose";

export interface IWallet {
  userId: Types.ObjectId;
  balance: number;
  bonusBalance: number;
  updatedAt: Date;
}

const walletSchema = new Schema<IWallet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    index: true
  },
  balance: { type: Number, default: 0 },
  bonusBalance: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export const Wallet = model<IWallet>("Wallet", walletSchema);
