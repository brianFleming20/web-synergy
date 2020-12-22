//jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const findOrCreate = require('mongoose-findorcreate');



const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 2*60*1000 
}  
}));

app.use(passport.initialize());
app.use(passport.session());




mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

const personel = "Personel site.";
const commerse = "e-Commerse site.";
const appSite = "Application support site.";

//current User
app.use(function (req, res,next){
  res.locals.currentUser = req.user;
  next();
})

//MIDDLEWARE
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}

app.get("/", function (req, res) {
  res.render("home", {
    personal: personel,
    commerse: commerse,
    application: appSite,
    currentUser: User
  });
});


app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

//Auth Routes
app.get("/login",(req,res)=>{
  res.render("login");
});
app.post("/login",passport.authenticate("local",{
  successRedirect:"/userprofile",
  failureRedirect:"/login"
}),function (req, res){
});
app.get("/register",(req,res)=>{
  res.render("register");
});
app.post("/register",(req,res)=>{
  
  User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.render("register");
      }
  passport.authenticate("local")(req,res,function(){
      res.redirect("/login");
  })    
  })
})



app.get("/quotepersonal", function(req, res){
  res.render("quoteapp",{
    content: personel
  });
  
  });
  
  app.get("/ecommerse", function(req, res){
    res.render("quoteapp",{
      content: commerse
    });
    
    });
  
    app.get("/maintain", function(req, res){
      res.render("maintain");
    });
  
    app.get("/quoteapp", function(req, res){
      res.render("quoteapp",{
        content: appSite
      });
      
      });
  
  app.get("/contact", function(req, res){
    res.render("contact", function(err, signup){
      if(!err){
        res.render("success");
      }
    });
  });
  
  app.get("/about", function(req, res){
  res.render("about");
  });

  app.get("/gdpr", function(req, res){
    res.render("dataProtection");
  });

  app.get("/success", function(req, res){
    res.render("success");
    });

  app.get("/userProfile", (req, res) => {
    res.render("userProfile");
  })
  
  app.use("/", (req, res, next) => {
    res.render("404");
  });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on port 3000.");
});
