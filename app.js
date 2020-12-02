const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));


const personnelSite = "personnel site.";
const commerse = "e-Commerse site.";
const appSite = "application support site.";
const gdprtext1 = "Our Company is part of the Our Company Group which includes Our Company International and Our Company Direct. This privacy policy will explain how our organization uses the personal data we collect from you when you use our website.";


app.get("/", function(req, res) {

  res.render("home",{
    personnal:personnelSite,
    commerse: commerse,
    application: appSite
  });
});


app.get("/quotepersonnal", function(req, res){
res.render("quoteapp",{
  content: personnelSite
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
  res.render("contact");
});

app.get("/about", function(req, res){
res.render("about");
});

app.use("/", (req, res, next) => {
  res.render("404");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server running on port 3000.");
  });