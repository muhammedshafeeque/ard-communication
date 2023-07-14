import { DSE } from "../Models/DseModal.js";
import { Profile } from "../Models/ProfileModal.js";
import { Shope } from "../Models/ShopsModal.js";

export const checkNumberExist = async (mobile) => {
  try {
    let user = await Profile.findOne({ mobile: mobile });

    if (user) throw { status: 400, message: "mobile Number  allready exist" };
    let shop = await Shope.findOne({ mobile: mobile });
    if (shop) throw { status: 400, message: "mobile Number  allready exist" };
    shop = await Shope.findOne({ flexiNumber: mobile });
    if (shop) throw { status: 400, message: "mobile Number  allready exist" };
    let dse = await DSE.findOne({ mobile: mobile });
    if (dse) throw { status: 400, message: "mobile Number  allready exist" };
    return true;
  } catch (error) {
    throw error;
  }
};
