
$("#submit").on("click", function() {

	event.preventDefault();

  // Here we grab the text from the input box
    var animal = $("#animal-data").val().trim();

    if (animal =="") {

    	alert("Please type in an animal!");
    }
    else {

    	$("#button-display").append('<button class="animal">'+animal+'</button>'); 

     	var animal = $("#animal-data").val(""); 

    }

});

$("#button-display").on("click",".animal",function() {

	var animal = $(this).text();

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({

    	url: queryURL,

    	method: "GET"

    }).done(function(response) {

    	console.log(response);

    	$("#image-display").html("");

    	if (response.data.length == 0) {

    		$("#image-display").html("<p>Opppps! There is no image found. Please select another animal</p>");


    	}
    	else {

    		$.each(response.data,function(index,value) {

	    		var rating = value.rating;
		    	var imgAnimated = value.images.fixed_height_small.url;
		    	var imgStill = value.images.fixed_height_small_still.url;

		    	var gifDiv = $("<div class='gif'>");

		        var p = $("<p>").text("Rating: " + rating);

		        var animalImage = $("<img>");
		        animalImage.attr("src", imgStill);
		        animalImage.attr("state", "still");

		        animalImage.addClass("gyphy");

		        animalImage.attr("image-animated", imgAnimated);
		        animalImage.attr("image-still", imgStill);

		        gifDiv.prepend(p);
		        gifDiv.prepend(animalImage);

		        $("#image-display").prepend(gifDiv);


    		});


    	}

    	

    });


});

$("#image-display").on("click",'.gyphy',function() {

	var imageState = $(this).attr("state");

	if (imageState == "still") {

		var imageAnimated = $(this).attr("image-animated");
		$(this).attr("src",imageAnimated);

		$(this).attr("state","animated");

	}

	else {

		var imageStill = $(this).attr("image-still");
		$(this).attr("src",imageStill);

		$(this).attr("state","still");

	}


});

//initalize some buttons

var initButton = ["dog", "cat", "crocodile", "monkey","elephant","tiger"];

for (var i = 0;i<initButton.length;i++) {

	$("#button-display").append('<button class="animal">'+initButton[i]+'</button>'); 
}



