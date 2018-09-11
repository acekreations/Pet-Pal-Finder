//Dependencies
var path = require("path");
var pals = require("../data/pals");
var request = require("request");

//Code to be exported
module.exports = function(app){

  app.get("/api/pals", function(req, res){
    res.json(pals);
  });

  app.post("/api/pals", function(req, res){
    var newPal = {
      name: req.body.name,
      scores: req.body.scores
    };

    var topMatchId;
    var topMatchTotal = Infinity;
    //loop all pals in dataset
    for (var i = 0; i < pals.length; i++) {
      var totalDifference = 0;
      // //loop scores of current(i) pal
      for (var j = 0; j < pals[i].scores.length; j++) {
        var difference = newPal.scores[j] - pals[i].scores[j];
        totalDifference += Math.abs(difference);
      }
      if (totalDifference < topMatchTotal) {
        topMatchId = totalDifference;
        topMatchId = i;
      }
    }
    var query = "https://api.unsplash.com/photos/random/?client_id=1cef58c217f78080641b0747a94a8ad92f74893d4f4525c89a25174a4462ee3e&query=dog&count=1";
    request(query, function(err, response){
      if (err) throw err;
      response = JSON.parse(response.body);
      var img = response[0].urls.thumb;
      newPal.img = img;

      pals.push(newPal);
    });

    return res.json(pals[topMatchId]);

  });

};
