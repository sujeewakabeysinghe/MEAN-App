const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const schema=mongoose.Schema;


const userschema=new schema({
    username:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password1:{type:String,required:true}
});


const user=module.exports=mongoose.model("user",userschema);


module.exports.adduser=function(newuser1,callback){
    //console.log(newuser1.password1);
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newuser1.password1,salt,(err,hash)=>{
            if(err) throw err;
            //console.log(newuser1.password1);
            newuser1.password1=hash;
            //console.log(newuser1.password1);
            newuser1.save(callback);
        });
    });
};


module.exports.getuserbyemail=function(email,callback){
    //console.log(email);
    const query={email:email};
    //user.deleteOne(query,callback);
    user.findOne(query,callback);
};


module.exports.passwordcheck=function(password,hash,callback){
    bcrypt.compare(password,hash,(err,res)=>{
        //console.log(res);
        if(err) throw err;
        if(res){
            callback(null,res);
        }
        else{
            callback(null,res);
        }
    });
};


module.exports.getuserbyid=function(id,callback){
    //console.log(id);
    user.findById(id,callback);
};