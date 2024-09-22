const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session=require("express-session");
const ExpresssError=require("./utils/ExpressError.js")
const flash=require("connect-flash");
const ejsMate = require("ejs-mate");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


const articleRouter = require("./routes/articles.js");
const userRouter=require("./routes/user.js")

main()
    .then((res) => {
        console.log("connection successfull")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/blogpage');
}


const path = require("path");
const methodOverride = require("method-override");

let port = 8080;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);


const sessionOptions={
secret:"mysecreatblogweb",
    resave:false,
    saveUninitialized:true
}


app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())




app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
     next();
});




// app.get("/test",async(req,res)=>{
//     const article= new Blog({
//         title:"test article",
//         author:"neha",
//         phoneNumber:934787829,
//         content:"hello this is sample blog"
//     });
//     await article.save();
//     console.log("article saved");
// res.send("successfull testing");
// });

app.get("/demo",async(req,res)=>{
    let fakeUser=new User({
        email:"Student@gmail.com",
        username:"anshika"
    });
    let registeredUser=await User.register(fakeUser,"helloworld")
console.log(registeredUser);
res.send("registerd")
})

app.use("/blogs", articleRouter);
app.use("/",userRouter);


app.listen(port, (req, res) => {
    console.log(`app is listening on port ${port}`)
});