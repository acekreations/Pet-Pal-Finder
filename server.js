//Dependencies
var express = require("express");
var app = express();

//Server port
var PORT = process.env.PORT || 8080;















app.listen(PORT, function(){
  console.log("listening on port " + PORT);
});
