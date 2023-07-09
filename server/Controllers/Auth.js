import { Profile } from "../Models/ProfileModal.js";
import { User } from "../Models/UserModel.js";
import { comparePassword, encriptString, generateToken } from "../Utils/utils.js";

export const doRegister = async (req, res, next) => {
  try {
    let { name, email, mobile, password } = req.body;
    let user = await User.findOne({mobile:mobile})
    if (user) {
      next({ status: 400, message: "Mobile Number Allready  Exist" });
    } else {
      let Password = await encriptString(password);
      let person =await User.create({ mobile: mobile, password: Password });
      Profile.create({
        name,
        email,
        mobile,
        userId:person._id
      });
      res.send("user Registerd Success Fully");
    }
  } catch (error) {
    next(error);
  }
};
export const doLogin=async(req,res,next)=>{
  try {
    let {mobile,password}=req.body
    let user=await User.findOne({mobile:mobile})
    if(!user){next({status:400,message:'Mobile Number Doesnot Exist '})}
    else{
      let verifiedPassWord=await comparePassword(password,user.password)
      if(!verifiedPassWord){next({status:400,message:'Invalid Login Creditionals'})}
      else{
        let userData=await Profile.findOne({userId:user._id})
        let token=await generateToken(user._id)
        
        res.send({userData,token})
      }
    }
  } catch (error) {
    next(error)
  }
}
export const getRequestUser=async(req,res)=>{
  res.send(req.user)
}
