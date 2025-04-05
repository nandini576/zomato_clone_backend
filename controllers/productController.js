const Product = require('../models/Product')
const Firm=require('../models/Firm')
const path = require('path');

const multer=require('multer')

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, 'frimImages/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+path.extname(file.originalname));
    }
});
const upload=multer({storage:storage});
const addProduct=async(req,res)=>{
    try {
        const {productName,price,category,bestSeller,description}=req.body;
        const image=req.file? req.file.filename:undefined;
        const firmId = req.params.firmId;
        const firm=await Firm.findById(firmId);

        if(!firm){
             return res.status(404).json({messege:'firm not found'});
        }
        const product = new Product({
            productName,price,category,bestSeller,description,image,firm:firm._id
        })
        const savedProduct =await product.save()
        firm.products.push(savedProduct);
        await firm.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:' internal server error'});
    }
}
const getProductByFirm= async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({messege:'firm not found'}); 
        }
        const restaurantName=firm.firmName;
        const products =await Product.find({firm:firmId});
        res.status(200).json({restaurantName,products});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:' internal server error'});
    }
}
const deleteProductById =async(req,res)=>{
    try {
        const productId=req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({error:'product not found'}); 
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:' internal server error'});
    }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}