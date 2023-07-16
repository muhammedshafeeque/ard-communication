import { Line } from "../Models/LineModal.js";
import {
  dseSearch,
  lineSearch,
  shopSearch,
} from "../Service/searchSearch.service.js";
import { Profile } from "../Models/ProfileModal.js";
import { Shope } from "../Models/ShopsModal.js";
import { DSE } from "../Models/DseModal.js";
import moment from "moment";
import { DATE_FORMATE } from "../Config/Constant.js";
import { checkNumberExist } from "../Service/commonDbVaue.service.js";
export const createLine = async (req, res, next) => {
  try {
    let line = await Line.findOne({ code: req.body.code });
    if (line) {next({ status: 400, message: "Line Already Exist" })}
    else{
      line = await Line.create(req.body);
      res.send("line Created Successfully");
    }

  } catch (error) {
    next(error);
  }
};
export const getLines = async (req, res, next) => {
  try {
    let lines = await lineSearch(req.query);
    res.send(lines);
  } catch (error) {
    next(error);
  }
};
export const updateLines = async (req, res, next) => {
  try {
    let line = await Line.findById(req.params.id);
    if (!line) next({ status: 400, message: "line not Exist " });
    await Line.findByIdAndUpdate(line._id, req.body);
    res.send("line Updated Successfully");
  } catch (error) {
    next(error);
  }
};
export const deleteLine = async (req, res) => {
  try {
    await Line.findByIdAndRemove(req.params.id);
    res.send("line Deleted Successfully");
  } catch (error) {
    next(error);
  }
};
export const createDse = async (req, res, next) => {
  try {
    let user = await checkNumberExist(req.body.mobile);
    let body;
    if (req.body.activeUser) {
      user = await Profile.findById(req.body.activeUser);
      if (!user) next({ status: 400, message: "user Not exist" });
      body = {
        mobile: req.body.mobile,
        stock: req.body.stock ? req.body.stock : 0,
        activeUser: {
          user: user._id,
          startsFrom: moment(new Date()).format(DATE_FORMATE),
        },
        userHistory: [
          {
            user: user._id,
            startDate: moment(new Date()).format(DATE_FORMATE),
          },
        ],
      };
    } else {
      body = { mobile: mobile, stock: req.body.stock ? req.body.stock : 0 };
    }
    await DSE.create(body);
    res.send("dse Created Successfully");
  } catch (error) {
    next(error);
  }
};
export const getDses = async (req, res, next) => {
  try {
    let dses = await dseSearch(req.query);
    res.send(dses);
  } catch (error) {
    next(error);
  }
};
export const createShop = async (req, res, next) => {
  try {
    await checkNumberExist(req.body.mobile);
    await checkNumberExist(req.body.flexiNumber);
    await Shope.create(req.body);
    res.send("shop crated Successfully");
  } catch (error) {
    next(error);
  }
};
export const updateShop = async (req, res, next) => {
  try {
    await Shope.findByIdAndUpdate(req.params.id, req.body);
    res.send("shop updated successfully");
  } catch (error) {
    next(error);
  }
};
export const getShops = async (req, res, next) => {
  try {
    let shops = await shopSearch(req.query);
    res.send(shops);
  } catch (error) {
    next(error);
  }
};
export const removeShop = async (req, res, next) => {
  try {
    let shop = await Shope.findById(req.params.id);
    if (!shop) {
      next({ status: 400, message: "shop not found" });
    } else {
      if (shop.outstandings > 0) {
        next({
          status: 400,
          message: "shope has Outstanding Balence , please clear all balances",
        });
      } else {
        await Shope.findByIdAndRemove(req.params.id);
        res.send("Shop Removed Successfully");
      }
    }
  } catch (error) {
    next(error);
  }
};
