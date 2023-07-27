import mongoose, { mongo } from "mongoose";
import { DSE } from "../Models/DseModal.js";
import { DSE_STOCK } from "../Models/DseStockModal.js";
import { dseSearch } from "../Service/searchSearch.service.js";

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
  let query = req.query;
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
export const getDseStocks = async (req, res, next) => {
  try {
    let query = req.query;
    if (req.user.aleas !== "admin") {
      let dse = await DSE.findOne({ "activeUser.user": req.user._id });
      if (!dse) {
        next({
          status: 400,
          message: "you are not mapped with any Dse please contact distributor",
        });
      } else {
        res.send({
          stockBalance: dse.stock,
          name: req.user.name,
          dseNumber: dse.mobile,
        });
      }
    } else {
      if (query.user) {
        let dse = await DSE.findOne({
          "activeUser.user": new mongoose.Types.ObjectId(req.user),
        }).populate("activeUser.user");
        res.send([
          {
            stockBalance: dse.stock,
            name: req.user.name,
            dseNumber: dse.mobile,
          },
        ]);
      } else {
        let dses = await dseSearch(query);
        let arr = [];
        dses.forEach((dse) => {
          console.log(dse);
          arr.push({
            stockBalance: dse.stock,
            name:
              dse.activeUser && dse.activeUser.user
                ? dse.activeUser.user.name
                : "",
            dseNumber: dse.mobile,
          });
        });
        res.send(arr);
      }
    }
  } catch (error) {
    next(error);
  }
};
