import mongoose from "mongoose";
import { Line } from "../Models/LineModal.js";
import { Shope } from "../Models/ShopsModal.js";

export const shopToLineMapping = async (req, res, next) => {
  try {
    let shopArray = [];
    if (!req.body.length)next({ status: 400, message: "shpops are empty" });
    let line = await Line.findById(req.params.id);
    if (!line)next({ status: 400, message: "line Note Found" });
    await req.body.forEach(async (element) => {
      let shop = await Shope.findById(element);
      if (shop) shopArray.push(element)
      else next({ status: 400, message: "some Shops note fount" });
    });
    await req.body.forEach((str) => {
      shopArray.push(new mongoose.Types.ObjectId(str));
    });
    await Line.findByIdAndUpdate(req.params.id, {
      $addToSet: { shops: { $each: shopArray } },
    });
    res.send("Shops mapped Successfully");
  } catch (error) {
    next(error);
  }
};
