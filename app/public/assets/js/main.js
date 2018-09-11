//onclick listening for form submission
$("#submit-survey").on("click", function(){
  event.preventDefault();

  //get answers to questions and put them in an array
  var scores = [$("#q1").val().trim(), $("#q2").val().trim(), $("#q3").val().trim(), $("#q4").val().trim(), $("#q5").val().trim(),];

  //create obj to send to the server
  var surveyResults = {
    name: $("#pet-name").val().trim(),
    scores: scores
  };

  //send submission request to server
  $.post("/api/pals", surveyResults)
    .then(function(res){
      //alert content, displaying match name and image
      var html = '<h3>We found a match!</h3><img src="' + res.img + '"><p>' + res.name + '</p>';
      //trigger UIKit alert style modal
      UIkit.modal.alert(html);
    });

});
