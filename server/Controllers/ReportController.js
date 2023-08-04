import { DSE } from "../Models/DseModal.js";

export const createReport = async (req, res, next) => {
  try {
    let {closingBalance}=req.body
    let dse = await DSE.findOne({
      "activeUser.user": new mongoose.Types.ObjectId(req.user),
    });
    let openingBalance=dse.stock
    


  } catch (error) {
    next(error);
  }
};
