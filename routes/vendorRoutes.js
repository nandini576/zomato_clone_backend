//this routes are used to store the data into db

//importing vendor controllers
const vendorController = require('../controllers/vendorController');
const express= require('express');

const router = express.Router()//Router is one of the function in express

router.post('/register',vendorController.VendorRegister);//defining route to an API through an end point '/reister'
router.post('/login',vendorController.VendorLogin);
router.get('/all-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:id',vendorController.getVendorByid)
//exporting router
 
module.exports =router;