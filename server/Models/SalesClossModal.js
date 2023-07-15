import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const salesClossesModel = mongoose.Schema(
  {
    openingBalance: { type: Number, required: true },
    clossingBalance: { type: Number, required: true },
    CashInhand: { type: Number, required: true },
    CashOnBank: { type: Number, required: true },
    date: { type: String, required: true },
    outstandings: { type: Number },
  },
  {
    timestaps: true,
  }
);
export const SALESE_CLOSSES = mongoose.model(
  collections.SALES_CLOSS_COLLECTION,
  salesClossesModel
);
