import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const dseStockModel = mongoose.Schema(
  {
    dse:{type:mongoose.Schema.Types.ObjectId,required:true,ref:collections.DSE_COLLECTION},
    amount:{type:Number,required:true},
    date:{type:String},
    time:{type:String}
  },
  {
    timestaps: true,
  }
);
export const DSE_STOCK = mongoose.model(collections.DSE_STOCK_COLLECTION, dseStockModel);