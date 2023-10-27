const express=require("express");
const router=express.Router();

router.get("/login",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('login');
});
router.get("/register",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('register');
});
router.get("/home",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('homepage');
});
router.get("/choice",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('choicepage');
});

router.get("/carpenter",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('carpenter');
});

router.get("/plumber",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('plumber');
});
router.get("/plumberentry",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('plumberentry');
});
router.get("/carpenterentry",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('carpenterentry');
});
router.get("/electricianentry",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('electricianentry');
});
router.get("/about",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('about');
});

router.get("/electrician",(req,res)=>{
    // res.send("<h1>assalamualaikum bitches</h1>");
    res.render('electrician');
});

module.exports=router;

