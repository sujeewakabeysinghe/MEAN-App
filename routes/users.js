const express=require("express");
const User=require("../models/user");
const router=express.Router();
const jsonwebtoken=require("jsonwebtoken");
const config=require("../config/database");
const passport=require("passport");


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


router.post("/register",(req,res)=>{
    //console.log(req.body);
    const newuser=new User({
        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        password1:req.body.password
    });

    User.adduser(newuser,(err,user)=>{
        if(err){
            res.json({state:false,msg:"failed to register!"});
            console.log("failed to register!");
        }
        else{
            res.json({state:true,msg:"successfully registered!"});
            console.log("successfully registered!");
            //console.log(newuser.password1);
        }
    });
});


router.post("/login",(req,res)=>{
    
    const email=req.body.email;
    const password=req.body.password;

    User.getuserbyemail(email,(err,user)=>{
        if(err) throw err;

        if(user){
            //console.log(user);
            User.passwordcheck(password,user.password1,(err,match)=>{
                //console.log(match);
                if(err) throw err;
                if(match){
                    const token=jsonwebtoken.sign(user.toJSON(),config.secret,{expiresIn:30});
                    //console.log(token);
                    res.json({
                        state:true,
                        msg:"you are in!",
                        token:"Bearer "+token
                    });
                    console.log("you are in!");  
                }
                else{
                    res.json({state:false,msg:"password wrong!"});
                    console.log("password wrong!");
                }
            });
        }
        else{
            res.json({state:false,msg:"email wrong!"});
            console.log("email wrong!");
        }
        
    });

});


router.get("/profile",passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({user:req.user});
    console.log("you are on profile!");
});


module.exports=router;