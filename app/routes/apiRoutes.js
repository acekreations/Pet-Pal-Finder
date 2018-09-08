//Dependencies
var path = require("path");
var pals = require("../data/pals");

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

    pals.push(newPal);

    return res.json(pals[topMatchId]);

  });

};
