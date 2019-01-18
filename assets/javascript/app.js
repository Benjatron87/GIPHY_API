$(document).ready(function() {

var sports = ["Basketball", "Ultimate Frisbee", "Football", "Hockey", "Soccer"];

      
      function makeButtons() {
       
        $("#buttons-div").empty();

        sports.forEach(function(sport){
          var newButton = $("<button>");
          newButton.addClass("sport");
          newButton.attr('data-name', sport);
          newButton.text(sport)

          $("#buttons-div").append(newButton);
        });

      }

      $("#add-button").on("click", function(event) {

        event.preventDefault();
        
        var value = $("#user-input").val().trim();

        console.log(value);

        if (value != ""){

        sports.push(value);

        makeButtons();

        }

      });

      $(document).on("click", ".sport", function(){

        var item = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=&q=" + item.toLowerCase() + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response){

          console.log(response);

          var parentID = $("#gifs");
          var newDiv = $("<div>");
          var newImage = $("<img>");

          var gifUrl = response
          var rating = response.Rated;

          newDiv.append("Rated: " + rating + "<br><br>");
          newImage.attr("src", gifUrl);

          parentID.prepend(newDiv, newImage);
          
        })
      })

      $("#clear").click(function(event){
        event.preventDefault();

        $("#gifs").empty();
      })

      makeButtons();

    });