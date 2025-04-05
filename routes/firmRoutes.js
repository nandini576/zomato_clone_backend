const express =require('express')
const firmController=require('../controllers/firmController');
const verifyToken=require('../middlewares/verifyToken');

const router=express.Router();
router.post('/add-firm',verifyToken,firmController.addFirm)//here firm is added based on token so add that verify token also
router.get('/firmImages/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    req.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.delete('/:firmId',firmController.deleteFirmById)
//export route
module.exports = router;