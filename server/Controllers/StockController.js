import { DSE } from "../Models/DseModal.js";
import { DSE_STOCK } from "../Models/DseStockModal.js";

export const addStock = async (req, res, next) => {
  try {
    let payload = {
      dse: req.body.dseId,
      amount: req.body.amount,
    };
    let dse = await DSE.findById(req.body.dseId);
    if (!dse) {
      next({ status: 400, message: "Dse Not Fount" });
    } else {
      await DSE_STOCK.create(payload);
      await DSE.findByIdAndUpdate(req.body.dseId, {
        $inc: {
          stock: req.body.amount,
        },
      });
      res.send("stock Added Successfully");
    }
  } catch (error) {
    next(error);
  }
};
export const getStocks = async (req, res, next) => {
  let query=req.query
  try {
    let stocks = await DSE_STOCK.find()
      .populate("dse")
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    res.send(stocks);
  } catch (error) {
    next(error);
  }
};
