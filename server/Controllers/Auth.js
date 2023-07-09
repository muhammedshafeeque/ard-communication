import { Profile } from "../Models/ProfileModal.js"
import { User } from "../Models/UserModel.js"
import { encriptString } from "../Utils/utils.js"

export const doLogin=async(req,res,next)=>{
    let login_body=req.body
    try {
        let user= Profile.findOne({mobile:login_body.mobile})
        if(!user) next({ status: 400, message: "Mobile Number Allready  Exist" })
        let password=await encriptString(login_body.password)
        let person=User.create({mobile:user.mobile,password:password})
        login_body.userId=person._id
        Profile.create(login_body)
        res.send('user Registerd Success Fully')
    } catch (error) {
        next(error)
    }

}