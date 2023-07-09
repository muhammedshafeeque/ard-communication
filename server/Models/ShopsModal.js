import mongoose from "mongoose";
const ShopModel = mongoose.Schema(
  {
    name:{type:String},
    mobile:{type:Number},
    flexiNumber:{type:Number},
    FlexiStock:{type:Number, default:0},
    SimStock:{type:Number,default:0},
    pendingPayments:{type:Number}
  },
  {
    timestaps: true,
  }
);
export const RouteModal = mongoose.model("Shop", shopModel);