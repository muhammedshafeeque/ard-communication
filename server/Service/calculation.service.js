import { Line } from "../Models/LineModal.js";

export const calculareLineOutstandings = async (id) => {
  try {
    let sum = 0;
    let line = await Line.findById(id).populate("shops");
    await line.shops.forEach((shop) => {
      sum = sum + shop.outstanding;
    });
    return sum;
  } catch (error) {
    throw error;
  }
};
