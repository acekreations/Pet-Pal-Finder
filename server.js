//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//Server port
var PORT = process.env.PORT || 5000;

//Allow 'app' to parse json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('app/public/assets'));

//Routes
require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);




//Start server
app.listen(PORT, function(){
  console.log("listening on port " + PORT);
});
