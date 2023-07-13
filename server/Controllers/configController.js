import { Line } from "../Models/LineModal.js";
import { dseSearch, lineSearch } from "../Service/searchSearch.service.js";
import { Profile } from "../Models/ProfileModal.js";
import { Shope } from "../Models/ShopsModal.js";
import { DSE } from "../Models/DseModal.js";
import moment from "moment";
import { DATE_FORMATE } from "../Config/Constant.js";
export const createLine = async (req, res, next) => {
  try {
    let line = await Line.findOne({ code: req.body.code });
    if (line) next({ status: 400, message: "Line Already Exist" });
    line = await Line.create(req.body);
    res.send("line Created Successfully");
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
    let { mobile } = req.body;
    let user = await Profile.findOne({ mobile: mobile });
    if (user) next({ status: 400, message: "mobile Number  allready exist" });
    let shop = await Shope.findOne({ mobile: mobile });
    if (shop) next({ status: 400, message: "mobile Number  allready exist" });
    shop = await Shope.findOne({ flexiNumber: mobile });
    if (shop) next({ status: 400, message: "mobile Number  allready exist" });
    let dse = await DSE.findOne({ mobile: mobile });
    if (dse) next({ status: 400, message: "mobile Number  allready exist" });
    let body;
    if (req.body.activeUser) {
      user = await Profile.findById(req.body.activeUser);
      if (!user) next({ status: 400, message: "user Not exist" });
      body = {
        mobile: mobile,
        stock: req.body.stock ? req.body.stock : 0,
        activeUser: {
          user: user._id,
          startsFrom: moment(new Date()).format(DATE_FORMATE),
        },
        userHistory: [
          { user: user._id, startDate: moment(new Date()).format(DATE_FORMATE) },
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
export const getDses=async(req,res)=>{
  try {
    let dses=await dseSearch(req.query)
    res.send(dses)
  } catch (error) {
    next(error)
  }
}
