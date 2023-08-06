import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const reportModal = mongoose.Schema(
  {
    openingBalance: { type: Number, required: true },
    closingBalance: { type: Number, required: true },
    liquidCash: { type: Number, required: true },
    CashOnBank: { type: Number, required: true },
    date: { type: String, required: true },
    outstandings: [{type: mongoose.Schema.Types.ObjectId,ref:collections.OUTSTANDINGS_COLLECTiON}],
    payments:[{type: mongoose.Schema.Types.ObjectId,ref:collections.PAYMENT_COLLECTION}],
    dse:{type: mongoose.Schema.Types.ObjectId,ref:collections.DSE_COLLECTION}
  },
  {
    timestaps: true,
  }
);
export const REPORTS = mongoose.model(
  collections.REPORT_COLLECTION,
  reportModal
);
