
var arrayOfThings = ['Nyan Cat', 'Spider Pig', 'Morty'];

var secondArray = [];


	$('#addButton').on('click', function(){


	
	var inputValue = $('#input').val().trim();

	console.log(inputValue);


	arrayOfThings.push(inputValue);
		
	makeButtons();

	})


function makeButtons(){
		
		$('#buttonBox').empty();

		for (var i = 0; i < arrayOfThings.length; i++){
		
		    var a = $('<div>') 
		    a.addClass('gifButton'); 
		    a.attr('data-things', arrayOfThings[i]); 
		    a.text(arrayOfThings[i]); 
		    $('#buttonBox').append(a); 
		}

		$("#input").val("");

	}


$(document).on("click" , ".gifButton"  ,  function () {


	var theGif = $(this).attr('data-things');

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theGif + "&limit=20&api_key=dc6zaTOxFJmzC&rating=R";


 	$.ajax({ url: queryURL, method:'GET'}).done(function(response){

 		var results = response.data;

 		secondArray.push(response.data);

 		$("#gify-box").empty();

 		for (i=0 ; i < results.length ; i++) {

 			var gifbox = $('<div class="adjustments">');

 			var rating = results[i].rating; 

 			var still = results[i].images.fixed_height_still.url;

 			var animate = results[i].images.fixed_height.url; 

			var text = $('<p class="nsfw">').html("Rating: " + rating );

 			var stuffImage = $('<img class="pictures">'); 
				stuffImage.attr('src', still );
				stuffImage.attr('data-state', "still");
				stuffImage.attr('data-still', still);
				stuffImage.attr('data-animate', animate);
			gifbox.append(stuffImage);
			gifbox.prepend(text);
			$('#gify-box').prepend(gifbox);

		}

		$(".pictures").on("click" ,  function () {

			var check = $(this).attr('data-state')

			if (check == 'still') {

			$(this).attr('src', $(this).data('animate'));
			 $(this).attr('data-state', 'animate');
		}

		else {

			 $(this).attr('src', $(this).data('still'));
        	 $(this).attr('data-state', 'still');
		}


		});



    });

});





      





makeButtons();