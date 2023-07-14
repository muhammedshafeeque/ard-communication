import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const lineModel = mongoose.Schema(
  {
    name:{type:String,require:true,},
    code:{type:String,require:true,unique:true},
    dse:{type:mongoose.Schema.Types.ObjectId, ref:collections.DSE_COLLECTION},
    shops:[{type:mongoose.Schema.Types.ObjectId, ref:collections.SHOPS_COLLECTION,unique:true}]
  },
  {
    timestaps: true,
  }
);
export const Line = mongoose.model(collections.LINE_COLLECTION, lineModel);