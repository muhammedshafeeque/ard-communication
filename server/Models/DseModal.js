import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const dseModal = mongoose.Schema(
  {
    mobile: { type: Number, required: true, unique: true },
    stock: { type: Number, default: 0 },
    activeUser: {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: collections.PROFILE_COLLECTION,
      },
      startsFrom: { type: String },
    },
    status: { type: String, default: "active" },
    userHistory: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: collections.PROFILE_COLLECTION,
        },
        date: { type: String },
        history: { type: String },
      },
    ],
    lines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: collections.LINE_COLLECTION,
      },
    ],
  },
  {
    timestaps: true,
  }
);
export const DSE = mongoose.model(collections.DSE_COLLECTION, dseModal);
