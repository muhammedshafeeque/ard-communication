import { Line } from "../Models/LineModal.js";
import { lineSearch } from "../Service/searchSearch.service.js";

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
