import { Profile } from "../Models/ProfileModal.js";
import { User } from "../Models/UserModel.js";
import { searchUser } from "../Service/searchSearch.service.js";
import { userRegisterEmail } from "../Templates/emailTemplate.js";
import {
  comparePassword,
 
  encryptString,
 
  numberGenerator,
} from "../Utils/utils.js";

export const createUser = async (req, res, next) => {
  const { mobile, name, email } = req.body;
  try {
    let exist = await User.findOne({ mobile: mobile });
    if (exist) {
      next({ status: 400, message: "User Already Exist" });
    } else {
      let password = await numberGenerator(12, true);
      let Password = await encryptString(password);
      let user = await User.create({ mobile: mobile, password: Password });
      await Profile.create({
        name,
        email,
        mobile,
        userId: user._id,
      });
      userRegisterEmail({ name, password, email });
      res.send("User created Successfully");
    }
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    let query = req.query;
    req.user.alias !== "admin" && (query.excludeAlias = "admin");
    let users = await searchUser(query);
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    let user = await User.findById(String(req.user.userId));
    let verifiedPassWord = await comparePassword(
      req.body.oldPassword,
      user.password
    );
    if (!verifiedPassWord) {
      next({ status: 400, message: "Old Password Mismatch" });
    } else {
      let Password = await encryptString(req.body.newPassword);
      await User.findByIdAndUpdate(String(req.user.userId), {
        $set: {
          password: Password,
        },
      });
      res.send("Password Changed Successfully");
    }
  } catch (error) {
    next(error);
  }
};
