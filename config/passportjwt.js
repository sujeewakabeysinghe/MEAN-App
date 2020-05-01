const jwtstrategy=require("passport-jwt").Strategy;
const extractjwt=require("passport-jwt").ExtractJwt;
const config=require("../config/database");
const user=require("../models/user");


const opts={};
opts.jwtFromRequest=extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secret;


module.exports=function(passport){
    passport.use(new jwtstrategy(opts,(jwt_payload,done)=>{
        user.getuserbyid(jwt_payload._id,(err,user)=>{
            //console.log(jwt_payload);
            //console.log(user);
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        });
    }));
}