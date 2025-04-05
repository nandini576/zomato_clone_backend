const mongoose= require('mongoose')//connecting this model to mongodb because  we are creating schemas

//creating vendor schema
const vendorSchema=mongoose.Schema({
    vendorName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
});

//exporting model for their access
const Vendor=mongoose.model('Vendor',vendorSchema) 

module.exports=Vendor