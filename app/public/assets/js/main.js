$("#submit-signup").on("click", function(){

  var scores = [$("#q1").val().trim(), $("#q2").val().trim(), $("#q3").val().trim(), $("#q4").val().trim(), $("#q5").val().trim(),];

  var surveyResults = {
    name: $("#pet-name").val().trim(),
    scores: scores
  };

  $.post("/api/pals", surveyResults)
    .then(function(res){
      console.log(res);
    });

});
