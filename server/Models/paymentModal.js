import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const paymentModel = mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: collections.SHOPS_COLLECTION,
    },
    line: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: collections.LINE_COLLECTION,
    },
    cllectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: collections.PROFILE_COLLECTION,
    },
    amount: { type: Number, required: true },
    DSE: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: collections.DSE_COLLECTION,
    },
    paymentType: { type: String },
    CollectedAt: { type: String },
    date: { type: String },
  },
  {
    timestaps: true,
  }
);
export const PAYMENT = mongoose.model(collections.PAYMENT_COLLECTION, paymentModel);
