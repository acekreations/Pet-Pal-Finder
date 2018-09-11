//Dependencies
var path = require("path");
var pals = require("../data/pals");
var request = require("request");

//Code to be exported
module.exports = function(app){

  //return all pals as json
  app.get("/api/pals", function(req, res){
    res.json(pals);
  });

  //handle new submissions
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
        //Find the difference between scores
        var difference = newPal.scores[j] - pals[i].scores[j];
        //Add to total. Math.abs to ensure the number is positive, this avoids worrying about the order of subtracting scores above
        totalDifference += Math.abs(difference);
      }
      //Check if there is a new better match
      if (totalDifference < topMatchTotal) {
        topMatchId = totalDifference;
        //set topMatchId to i. i represents the index of the pal in the pals array
        topMatchId = i;
      }
    }
    //Query unsplash api for a random dog pic to assign the new pal
    var query = "https://api.unsplash.com/photos/random/?client_id=1cef58c217f78080641b0747a94a8ad92f74893d4f4525c89a25174a4462ee3e&query=dog&count=1";
    request(query, function(err, response){
      if (err) throw err;
      response = JSON.parse(response.body);
      var img = response[0].urls.thumb;
      newPal.img = img;

      //Put new submission into array of existing pals
      pals.push(newPal);
    });

    //return best matched pal via id
    return res.json(pals[topMatchId]);

  });

};
