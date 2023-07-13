
import { DSE } from "../Models/DseModal.js";
import { Line } from "../Models/LineModal.js";

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
      .populate('dse')
    //   .populate('shops')
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);

      return lines
  } catch (error) {
    throw error;
  }
};
export const dseSearch=async(query)=>{
  try {
    let keywords = {};
    query.mobile&&(keywords.mobile=query.mobile)
    let dses=await DSE.find(keywords)
    .populate('activeUser.user')
    .populate('userHistory.user')
    .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
      return dses
  } catch (error) {
    throw error
  }
}