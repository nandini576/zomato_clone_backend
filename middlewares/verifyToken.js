const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config();
const secretKey=process.env.whatIsYourName;
const verifyToken = async(req,res,next)=>{
    const token=req.headers.token;//passing token through header
    if(!token)//token not present at headder
    {
        return res.status(401).json({error:'Token is required'});
    }
    try{
        const decoded = jwt.verify(token,secretKey);
        const vendor = await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        req.vendorId = vendor._id;
        next()//it allowa for next executiion only when all the try block correct
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"invalid token"})
    }
}
module.exports=verifyToken;