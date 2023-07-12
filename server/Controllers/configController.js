import { Line } from "../Models/LineModal.js"

export const createLine=async(req,res,next)=>{
    try {
        let line=await Line.findOne({code:req.body.code})
        if(line) next({status:400,message:'Line Already Exist'});
        line= await Line.crete(req.body)
        res.send('line Created Successfully')
    } catch (error) {
        next(error)
    }
}
// export const getLines