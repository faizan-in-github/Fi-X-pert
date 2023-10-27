const express=require("express");
const userController=require("../controller/users")
const router=express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/electrician",userController.electrician);
router.post("/carpenter",userController.carpenter);
router.post("/plumber",userController.plumber);
router.post("/plumberentry",userController.plumberentry);
router.post("/carpenterentry",userController.carpenterentry);
router.post("/electricianentry",userController.electricianentry);
module.exports=router;