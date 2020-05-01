const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const config=require("./config/database");
const bodyparser=require("body-parser");
const passport=require("passport");
const users=require("./routes/users");
const passportjwt=require("./config/passportjwt")(passport);
const cors=require("cors"); //this is for getting data from different ports like 4200 to 3000

const app=express();
const connection=mongoose.connect(config.database,{useUnifiedTopology: true,useNewUrlParser: true});
const port=3000;


app.use(bodyparser.json()); //body parser should be top to users route
app.use(passport.initialize());
app.use(passport.session());
app.use("/users",users);
app.use(express.static(path.join(__dirname,"public")));  //refer front-end folder
app.use(cors());


if(connection){
    console.log("DB works!");
}
else{
    console.log("DB does not work!");
}


app.listen(port,()=>{
    console.log("port works!");
});


app.get("/",(req,res)=>{
    res.send("hello world!")
});