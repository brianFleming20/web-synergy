const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/contact", function(req, res){
res.render("contact");
});

app.get("/quotepersonnal", function(req, res){
res.render("quotepersonnal");

});

app.get("/ecommerse", function(req, res){
  res.render("ecommerse");
  
  });

  app.get("/quoteapp", function(req, res){
    res.render("quoteapp");
    
    });

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/about", function(req, res){
res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server running on port 3000.");
  });