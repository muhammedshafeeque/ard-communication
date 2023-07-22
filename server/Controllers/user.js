import { Profile } from "../Models/ProfileModal.js";
import { User } from "../Models/UserModel.js";
import { searchUser } from "../Service/searchSearch.service.js";
import { encriptString } from "../Utils/utils.js";

export const craeteUser = async (req, res, next) => {
  const { mobile, name, email } = req.body;
  try {
    let exist = await User.findOne({ mobile: mobile });
    if (exist) {
      next({ status: 400, message: "User Allready Exist" });
    } else {
      let Password = await encriptString(mobile);
      let user = await User.create({ mobile: mobile, password: Password });
      await Profile.create({
        name,
        email,
        mobile,
        userId: user._id,
      });
      res.send("User created Successfully");
    }
  } catch (error) {
    next(error);
  }
};
export const getUsers=async(req,res,next)=>{
    try {
        let query=req.query
        req.user.aleas!=='admin'&&(query.excludeAleas='admin')
        let users=await searchUser(query)
        res.send(users)
    } catch (error) {
        next(error)
    }
}
