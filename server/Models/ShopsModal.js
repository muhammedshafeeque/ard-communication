import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const ShopModel = mongoose.Schema(
  {
    name:{type:String},
    mobile:{type:Number,require:true},
    flexiNumber:{type:Number},
    FlexiStock:{type:Number, default:0},
    SimStock:{type:Number,default:0},
    pendingPayments:{type:Number},
    contactPerson:{type:String},
    balance:{type:String}
  },
  {
    timestaps: true,
  }
);
export const Shope = mongoose.model(collections.SHOPS_COLLECTION, ShopModel);