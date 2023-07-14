import { Line } from "../Models/LineModal.js";
import { Shope } from "../Models/ShopsModal.js";

export const shopToLineMapping = async (req, res, next) => {
  try {
    let shopArray = [];
    let line = await Line.findOne(req.params.id);
    await req.body.forEach(async (element) => {
      let shop = await Shope.findById(element);
      if (shop) shopArray.push(element);
    });
    if (shopArray.length === req.body.length) {
      await Line.findByIdAndUpdate(req.params.id, {
        $push: { shops: { $each: req.body } },
      });
      res.send("Shops mapped Successfully");
    } else {
      next({ status: 400, message: "Shops Not Fount" });
    }
  } catch (error) {
    next(error);
  }
};
