import moment from "moment";
import { DSE } from "../Models/DseModal.js";
import { Line } from "../Models/LineModal.js";
import { Profile } from "../Models/ProfileModal.js";
import { Shope } from "../Models/ShopsModal.js";
import { REPORTS } from "../Models/reportModal.js";
import { DATE_FORMATE } from "../Config/Constant.js";
import { collections } from "../Config/Collections.js";

export const lineSearch = async (query) => {
  try {
    let keywords = {};
    query.query &&
      (keywords = {
        $or: [
          { code: { $regex: query.query, $options: "i" } },
          { name: { $regex: query.query, $options: "i" } },
        ],
      });
    query.name && (keywords.name = query.name);
    query.code && (keywords.code = query.code);

    let lines = await Line.find(keywords)
      // .populate("shops")
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);

    return lines;
  } catch (error) {
    throw error;
  }
};
export const dseSearch = async (query) => {
  try {
    let keywords = {};
    query.mobile && (keywords.mobile = query.mobile);
    let dses = await DSE.find(keywords)
      .populate("activeUser.user")
      // .populate("userHistory.user")
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    return dses;
  } catch (error) {
    throw error;
  }
};
export const shopSearch = async (query) => {
  try {
    let keywords = {};
    query.nameContains &&
      (keywords = {
        $or: [{ name: { $regex: query.nameContains, $options: "i" } }],
      });
    query.contactPersonContains &&
      (keywords = {
        $or: [
          {
            contactPerson: {
              $regex: query.contactPersonContains,
              $options: "i",
            },
          },
        ],
      });
    query.line && (keywords.line = query.line);
    query.mobile && (keywords.mobile = query.mobile);
    query.name && (keywords.name = query.name);
    query.flexiNumber && (keywords.flexiNumber = query.flexiNumber);
    query.outstanding &&
      (query.outstanding === "true"
        ? (keywords.outstanding = { $gt: 0 })
        : (keywords.outstanding = { $not: { $gt: 0 } }));
    let shops = await Shope.find(keywords)
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    return shops;
  } catch (error) {
    throw error;
  }
};
export const searchUser = async (query) => {
  try {
    let keywords = {};
    query.query &&
      (keywords = {
        $or: [{ name: { $regex: query.query, $options: "i" } }],
      });
    query.name && (keywords.name = query.name);
    query.excludeAlias && (keywords.alias = { $ne: excludeAlias });
    query.alias && (keywords.alias = query.alias);

    let users = await Profile.find(keywords)
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    return users;
  } catch (error) {
    throw error;
  }
};

export const searchReports = async (query) => {
  try {
    let keywords = {};

    if (query.fromDate && query.toDate) {
      keywords.createdAt = {
        $gte: moment(query.fromDate, "DD-MM-YYYY").toDate(),
        $lt: moment(query.toDate, "DD-MM-YYYY").add(1, "days").toDate(),
      };
    }

    if (query.dse) {
      keywords.dse = query.dse;
    }

    let reports = await REPORTS.find(keywords)
    .populate({ 
      path: 'dse',
      populate: {
        path: 'activeUser.user',
        model: collections.PROFILE_COLLECTION
      } 
   })
      .sort({ createdAt: -1 })
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);

    return reports;
  } catch (error) {
    throw error;
  }
};
