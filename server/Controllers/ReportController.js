import mongoose from "mongoose";
import { DSE } from "../Models/DseModal.js";
import moment from "moment";
import { DATE_FORMATE } from "../Config/Constant.js";
import { OutStandigs } from "../Models/OutStandigsModal.js";
import { Shope } from "../Models/ShopsModal.js";
import { REPORTS } from "../Models/reportModal.js";
import { PAYMENT } from "../Models/paymentModal.js";
import { searchReports } from "../Service/searchSearch.service.js";
export const createReport = async (req, res, next) => {
  try {
    let { closingBalance, outstandings, outstandIn, cashOnBank } = req.body;
    let dse = await DSE.findOne({
      "activeUser.user": new mongoose.Types.ObjectId(req.user),
    });
    let openingBalance = dse.stock;
    let sale = Math.round(((openingBalance - closingBalance) / 1041) * 1000);

    let cash = sale - cashOnBank;
    let date = moment(new Date()).format(DATE_FORMATE);
    let payments=[]
    let outs = [];
    if (outstandings.length) {
      outstandings.forEach((out) => {
        cash = cash - out.amount;
      });
      let Outstants = [];
      outstandings.forEach((item) => {
        Outstants.push({
          shop: item.shopId,
          AddedUser: req.user._id,
          amount: item.amount,
          billDate: date,
        });
      });
      outs = await OutStandigs.insertMany(Outstants);
    }
    let shopUpdate = new Promise((resolve, reject) => {
      if (!outstandings.length) {
        resolve();
      }
      outstandings.forEach(async (outs, index, array) => {
        await Shope.findByIdAndUpdate(outs.shopId, {
          $inc: {
            outstanding: outs.amount,
          },
        });

        if (index === outstandings.length - 1) {
          resolve();
        }
      });
    });
    if (outstandIn.length) {
      let outstandInS = [];
      outstandIn.forEach((outIn) => {
        cash = cash + outIn.amount;
        outstandInS.push({
          shop: outIn.shopId,
          DSE: dse._id,
          amount: outIn.amount,
          date,
        });
      });
      payments = await PAYMENT.insertMany(outstandInS);

    }
    let payentShopUpdate = new Promise((resolve, reject) => {
      if (!outstandIn.length) {
        resolve();
      }
      outstandIn.forEach(async (item, i) => {
        await Shope.findByIdAndUpdate(item.shopId, {
          $inc: {
            outstanding: -item.amount,
          },
        });
        if (i === outstandIn.length - 1) {
          resolve();
        }
      });
    });
    await shopUpdate;
    await payentShopUpdate;
    await DSE.findByIdAndUpdate(dse._id, {
      $set: {
        stock: closingBalance,
      },
    });

    let outsIds = [];
    await outs.forEach((item) => {
      outsIds.push(item._id);
    });
    let paymentIds = [];
    await payments.forEach((p) => {
      paymentIds.push(p._id);
    });
    let report = await REPORTS.create({
      openingBalance: openingBalance,
      closingBalance: closingBalance,
      liquidCash: cash,
      CashOnBank: cashOnBank,
      date,
      outstandings: outsIds,
      payments: paymentIds,
      dse: dse._id,
    });

    res.send('Report submitted Successfully');
  } catch (error) {
    next(error);
  }
};
export const getReports = async () => {
  try {
    if (req.user.alias !== "admin") {
      let dse = await DSE.findOne({
        "activeUser.user": new mongoose.Types.ObjectId(req.user),
      });
      req.query.dse=dse._id
    }
    let reports = await searchReports(rq.query);
    res.send(reports);
  } catch (error) {}
};
