import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const dseModal = mongoose.Schema(
  {
    mobile: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    activeDse: {
      _id: { type: mongoose.Schema.ObjectId, required: true, ref: collections.PROFILE_COLLECTION },
    },
    dses: [
      {
        _id: { type: mongoose.Schema.ObjectId, required: true },
        startDate: { type: Date ,required:true},
        End:{type:Date}
      },
    ],
  },
  {
    timestaps: true,
  }
);
export const DSE = mongoose.model(collections.DSE_COLLECTION, dseModal);  
 