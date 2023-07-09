import mongoose from "mongoose";
const RouteModel = mongoose.Schema(
  {
    name:{type:String},
    shops:[{type:mongoose.Schema.Types.ObjectId,ref:'Shops'}]
  },
  {
    timestaps: true,
  }
);
export const RouteModal = mongoose.model("Route", userModel);