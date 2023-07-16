import mongoose from "mongoose";
import { Line } from "../Models/LineModal.js";
import { Shope } from "../Models/ShopsModal.js";
import { DSE } from "../Models/DseModal.js";
import moment from "moment";
import { DATE_FORMATE } from "../Config/Constant.js";

export const shopToLineMapping = async (req, res, next) => {
  try {
    let shopArray = [];
    if (!req.body.length) next({ status: 400, message: "shpops are empty" });
    let line = await Line.findById(req.params.id);
    if (!line) next({ status: 400, message: "line Note Found" });
    let updates = new Promise((resolve, reject) => {
      req.body.forEach(async (element, index, array) => {
        let shop = await Shope.findById(element);
        if (shop) {
          if (shop.line) {
            await Line.findByIdAndUpdate(shop.line, {
              $pull: { shops: element },
            });
          }
          await Shope.findByIdAndUpdate(element, {
            $set: {
              line: line._id,
            },
          });
          shopArray.push(element);
        } else {
          reject({ status: 400, message: "some Shops note fount" });
        }
        if (index === array.length - 1) resolve();
      });
    });
    updates
      .then(async () => {
        await req.body.forEach((str) => {
          shopArray.push(new mongoose.Types.ObjectId(str));
        });
        await Line.findByIdAndUpdate(req.params.id, {
          $addToSet: { shops: { $each: shopArray } },
        });

        res.send("Shops mapped Successfully");
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};
export const dseLineMapping = async (req, res, next) => {
  try {
    let dse = DSE.findById(req.params.id);
    if (!dse) next({ status: 400, message: "Dse Note Found" });
    await DSE.findByIdAndUpdate(req.params.id, {
      $addToSet: { lines: req.body.lineId },
    });
    res.send("Line mapped to dse Successfully");
  } catch (error) {
    next(error);
  }
};
export const userDsemapping = async (req, res, next) => {
  try {
    await DSE.findByIdAndUpdate(req.params.id, {
      $set: {
        activeUser: {
          user: req.body.userId,
          startsFrom: moment(new Date()).format(DATE_FORMATE),
        },
        $addToSet: {
          userHistory: {
            user: req.body.userId,
            startDate: moment(new Date()).format(DATE_FORMATE),
          },
        },
      },
    });
    res.send("user mapped to dse");
  } catch (error) {
    next(error);
  }
};
