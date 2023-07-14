import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const ShopModel = mongoose.Schema(
  {
    name:{type:String},
    mobile:{type:Number,require:true,unique:true},
    flexiNumber:{type:Number,unique:true},
    Stock:{type:Number, default:0},
    outstanding:{type:Number,default:0},
    contactPerson:{type:String},
    line:{type:mongoose.Schema.Types.ObjectId}

  },
  {
    timestaps: true,
  }
);
export const Shope = mongoose.model(collections.SHOPS_COLLECTION, ShopModel);