//importing all the required modules after instalaltion
const express= require('express')//importing express
const mongoose= require('mongoose')//importing mongodb
require('dotenv').config()//importing dotenv as well as configuration
const User=require('./models/User')//importing our locally created model && this model is used for api
const bcrypt=require('bcryptjs')
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')//sends the data from user in json format
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes')
const path=require('path')

//middlware used for sending HTTP request
const PORT=process.env.PORT || 3000
const app=express()//assigning express functions to a variable
app.use(express.json())
app.use(bodyParser.json())//converts user data into json
app.use('/vendor',vendorRoutes);//complete route is defined
app.use('/firm',firmRoutes);
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'));
//connecting to mongodb atlas
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected successfully..."))//connecting to the db.mondodb_url:variable in .env file and "process.env.MONDO_URL=.access the MONGO_URL in .env file
.catch((err)=>console.log(err))

//API landing page http://localhost:3000/
app .get('/',async(req,res)=>{
    try{
        res.send("<h1 style='text-align:center;'>welcome</h1>")
    }
    catch(err){
        console.log(err)
    }
})

//API registration page
app.post('/register',async(req,res)=>{
   const  {user,email,password}=req.body
    try{
     const hashPassword=await bcrypt.hash(password,10)
     const newUser=new User({user,email,password:hashPassword})//taking data from user registration
     await newUser.save()//saving it into db& awit used for multiple users can wait
     console.log("suceessfully completed...")//displayed at terminal
     res.json({message:'user created...'})//displayed at apli tester and to work this include one middleware
    }
    catch(err){
        console.log(err);
    }
})
//API login page
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
       const user=await User.findOne({email});
       if(!user || !(await bcrypt.compare(password,user.password)))
       {
        return res.status(400).json({message:"Invalid Crendentials"});
       }
       res.json({message:"login Success",username: user.username})
    }
    catch(err){
        console.log(err)
    }
})

//server running and testing,creating server
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("server is running on  port:"+PORT)
})
