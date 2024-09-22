const express=require("express");
const User=require("../models/user.js");
const passport = require("passport");
const { route } = require("./user.js");
const router=express.Router();

router.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

router.post("/signup",async(req,res)=>{
    try{

 
    let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("success","user was registered successfully");
    res.redirect("/blogs");
}catch(err){
    req.flash("error",err.message);
    res.redirect("/signup")
}
});


router.get("/login",(req,res)=>{
    res.render("login.ejs");
});

router.post("/login",
    passport.authenticate("local",
        {failureRedirect:"/login",
            failureFlash:true
        }
    ),async(req,res)=>{
        req.flash("success","you are logged in")
   res.redirect("/blogs");
    }
);

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next();
        }
        req.flash("success","You are Logout");
        res.redirect("/blogs");
    })
})


module.exports=router;
