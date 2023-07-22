import { DSE } from "../Models/DseModal.js";
import { Line } from "../Models/LineModal.js";
import { Profile } from "../Models/ProfileModal.js";
import { Shope } from "../Models/ShopsModal.js";
import { User } from "../Models/UserModel.js";

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
      .populate("dse")
      .populate("shops")
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
      .populate("userHistory.user")
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
    query.excludeAleas && (keywords.aleas = { $ne: excludeAleas });
    query.aleas && (keywords.aleas = query.aleas);

    let users = await Profile.find(keywords)
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    return users;
  } catch (error) {
    throw error;
  }
};
