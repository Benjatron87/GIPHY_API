$(document).ready(function() {

var sports = ["BASKETBALL", "ULTIMATE FRISBEE", "FOOTBALL", "HOCKEY", "SOCCER"];

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

        value = value.toUpperCase();
        
        var exists = sports.indexOf((value));

        console.log(exists);

        console.log(value);

        console.log(sports);

        if (value != "" && exists == -1){

        sports.push(value);

        makeButtons();

        }

      });

      $(document).on("click", ".sport", function(){

        var parentId = $("#gifs");

        parentId.empty();

        var item = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=BmYcs67AmZXib6KE0iCK6OgqVujNjYoq&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response){

          console.log(response);

        for(var i = 0; i < 10; i++){

            var newDiv = $("<div>");
            var newImage = $("<img>");
            newImage.addClass("gif-image");

            var imgUrl = response.data[i].images.original_still.url;
            var rating = response.data[i].rating;
            var gifUrl = response.data[i].images.original.url;

            newImage.attr("data-still", imgUrl);
            newImage.attr("data-animate", gifUrl);
            newImage.attr("data-state", "still");

            newDiv.append("Rated: " + rating + "<br>");
            newImage.attr("src", imgUrl);

            parentId.prepend(newDiv, newImage, "<br><br>");
            }

            $(".gif-image").click(function(){

                var state = $(this).attr("data-state");
    
                if(state === "still"){
    
                    var url = $(this).attr("data-animate");
    
                    $(this).attr("src", url);

                    $(this).attr("data-state", "animate");

                    console.log(state);
                }
                else{
                    
                    var url = $(this).attr("data-still")
    
                    $(this).attr("src", url);

                    $(this).attr("data-state", "still");

                    console.log(state);

                }
            })
          
        })

      })

      $("#clear").click(function(event){
        event.preventDefault();

        $("#gifs").empty();
      })

      makeButtons();

    });