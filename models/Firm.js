const mongoose = require('mongoose')
 const firmSchema = new mongoose.Schema({
    firmName:{type:String,required:true,unique:true},
    area:{type:String,required:true},
    category:{
        type:[
        {
          type:String,
          enum:['veg','non-veg']
        }
     ]
    },
    region:{//multiple values
        type:[
            {
            type:String,
            enum:['south-indian','north-indian','chinese','backery']
          }
        ]
    },
    offer:{type:String},
    image:{type:String},
    vendor:[//forms relation with vendor model
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
    ],
    products:[//forms relation with vendor model
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Product'
      }
  ]
 })
 const Firm = mongoose.model('Firm',firmSchema)
 module.exports = Firm