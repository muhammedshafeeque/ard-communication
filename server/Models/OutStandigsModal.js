import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const OutStandigsModel = mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: collections.SHOPS_COLLECTION,
    },
    AddedUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: collections.PROFILE_COLLECTION,
    },
    amount: { type: Number, required: true },
    billDate: { type: String, required: true },
  },
  {
    timestaps: true,
  }
);
export const OutStandigs = mongoose.model(
  collections.OUTSTANDING_COLLECTiON,
  OutStandigsModel
);
