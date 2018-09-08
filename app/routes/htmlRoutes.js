var path = require("path");

//Code to be exported
module.exports = function(app){

  //Landing page, delivers home.html
  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  //Survey page, delivers survey.html
  app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
};
