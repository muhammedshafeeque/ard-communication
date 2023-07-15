import { DSE } from "../Models/DseModal.js";
import { DSE_STOCK } from "../Models/DseStockModal.js";

export const addStock = async (req, res, next) => {
  try {
    let payload={
        dse:req.body.dseId,
        amount:req.body.amount

    }
    await DSE_STOCK.create(payload);
    await DSE.findByIdAndUpdate(req.body.dseId, {
      $inc: {
        stock:req.body.amount,
      },
    });
    res.send("stock Added Successfully");
  } catch (error) {
    console.log(error)
    next(error);
  }
};
