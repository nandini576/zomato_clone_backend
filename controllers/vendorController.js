//controllers are used to write logic on data stored in db
const Vendor = require('../models/Vendor');//importing vendor file in this controller.contoller used to write the logic stored in schema
const jwt = require('jsonwebtoken');//this used to convert our email into tokens before storing in db
const bcrypt = require('bcryptjs')//hash the password
const dotEnv = require('dotenv')
dotEnv.config();
const secretKey = process.env.whatIsYourName;
//register logic=>checking existency of email and hashing the password
const VendorRegister = async(req,res)=>{
    console.log("Vendor Register API Hit");
    const {vendorName,email,password} = req.body;//takes Vendor details from body
    try{
        console.log("Received:", vendorName, email);
        const vendorEmail = await Vendor.findOne({email});//takes email from Vendor && await is mandatory as we use async
        
        //checking for email in db
        if(vendorEmail){
            console.log("Email already exists.");
            return res.status(400).json("Email already taken");//sends response in json format
        }
        const hashPassword = await bcrypt.hash(password,20);//hash the password 20 times
        console.log("Password hashed");
         
        //creating an instance to store the values in db
        const newVendor = new Vendor({vendorName,email,password:hashPassword})
        
         
        //saving the data into db
         await newVendor.save();
         console.log("Saved to DB");

         //sending an acknowledgment that data stored successfully!
        res.status(201).json({message:"Vendor registered Successfully"}) //here status numbers 200-299 represents success
        //showing status on console
        console.log('registered');
    }catch(error){
        res.status(500).json({error:'internal server error'})
        console.log(error);
    }
}

//login logic=>matching email and password
const VendorLogin = async(req,res)=>{
    console.log("Vendor login API Hit");
    const {email,password} = req.body;
    try{
        const vendor = await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password,vendor.password)) ){
            console.log("email or password are not match")
            return res.status(401).json({error:"Email or password are missmatched"})
        }
         const token = jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:'1h'})//token created for each record based on id
         
         res.status(200).json({success:" vendor login successfull",token});
         console.log(email,'this is token',token);
        
    }catch(error){
        res.status(500).json({error:'internal server error'})
        console.log(error);
    }

}

const getAllVendors = async(req,res)=>{
    try{
       const vendors= await Vendor.find().populate("firm");
       res.json({vendors});
    }catch(error){
        res.status(500).json({error:'internal server error'});
        console.log(error);
    }
}

const getVendorByid = async(req,res)=>{
    const vendorId=req.params.id;
    try{
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
           return res.status(404).json({error:'vendor not found'});
        }
        res.status(200).json(vendor)
    }catch(error){
        res.status(500).json({error:'internal server error'});
        console.log(error);
    }
}
module.exports ={VendorRegister,VendorLogin,getAllVendors,getVendorByid}


