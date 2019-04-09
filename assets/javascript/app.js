

//Declare array that stores name of each animal searched by the user
var animalArray = [];

//Function that triggers when user clicks on Search button to search for a particular gif ------------------------
function handleSearch(event) {
    //Prevent for to reload
    event.preventDefault();
  
    //Get the search string entered by the user
    var searchTerm = $('#search-input')
      .val()
      .trim();
    
    console.log("Animal searched for: " + searchTerm);
  
    //If search string is empty then make no search to the GIPHY Api
    if (searchTerm === '') {
      return false;
    }
    
    //Create a button with respect to the search string
    createAnimalButton(searchTerm);

    getAnimalGifs(searchTerm);
  }
  

  //Function that creates button for each animal searched by the user -----------------------------------------
  function createAnimalButton(searchTerm) {

    //Empty the div before adding the buttons
    $("#animalGifsAdded").empty();

    //If search string is not present in the array then push it to the array
    if(!animalArray.includes(searchTerm)) {
    
      animalArray.push(searchTerm); //Push animal name onto the array to generate buttons array later
    }

    //Create buttons array from animalArray[]
    for(var i=0 ; i<animalArray.length ; i++) {

      var $mybtn = $("<button>")
          .attr("type", "button")
          .addClass("btn btn-primary mt-1 animalBtn btn-block")
          .attr("data-animal", animalArray[i])
          .text(animalArray[i]);

      $("#animalGifsAdded").prepend($mybtn);
      
    }

  } //End of createAnimalButton(searchTerm) fun


  //Function that generates the animal GIFs ------------------------------------------------------------------
  function getAnimalGifs(searchTerm) {

    //If user has entered a new search string then before firing queryURL empty div
    $('#animalGifs').empty();
    $('#search-term').text("");

    var noOfGifs = 8;
    var apiKey = "dc6zaTOxFJmzC";
    var queryUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${noOfGifs}&offset=30`;

    $.ajax({

      url: queryUrl,
      method: 'GET'

    }).then(function(gifData) {
      
        console.log(gifData);

        var results = gifData.data;

        results.forEach(showAnimalGifs);

        $('#search-term')
        .append(`Currently Showing ${noOfGifs} GIFs of: <i><strong>${searchTerm.toUpperCase()}</i></strong>`);

        //Empty the search string value
        $('#search-input').val('');
    });

  } //End of getAnimalGifs(searchTerm)


  //Function that shows all the Gifs --------------------------------------------------------------------------
  function showAnimalGifs(gifData) {

    // console.log("gifData.rating: " + gifData.rating);

    var $div = $('<div>');
    $div.addClass('col-3 mb-4');
  
    var $card = $('<div>');
    $card.addClass('card h-100');
  
    var $cardBody = $('<div>').addClass('card-body d-flex flex-column');
  
    $('<p>')
        .addClass('card-title text-center')
        .text("Rating: " + gifData.rating)
        .appendTo($cardBody);

    $("<img>")
        .addClass("card-img-bottom gifImg")
        .attr("src", gifData.images.fixed_height_still.url) //Populate the still src by default
        .attr("stillSrc", gifData.images.fixed_height_still.url) //Set still gif source
        .attr("animatedSrc", gifData.images.fixed_height.url) //Set animated gif source
        .attr("data-state", "still") //Set the gif state to "still" by default
        .attr("height", "200px")
        .css("border", "2px solid blue")
        .appendTo($cardBody);

  
    $cardBody.appendTo($card);
    $card.appendTo($div);
  
    $('#animalGifs').append($div);

  } //End of showAnimalGifs(gifData) fun
  

  //Function that triggers onClick of animal button ----------------------------------------------------------
  $("#animalGifsAdded").on("click", ".animalBtn", function() { 

    console.log("Inside animal button click event");

    var animal = $(this).attr("data-animal");
    console.log("animal: " + animal);

    getAnimalGifs(animal);
    
  });

  //Function that runs when a gif is clicked -----------------------------------------------------------
  $("#animalGifs").on("click", ".gifImg",  function() { 
    
    console.log("Image clicked...");
    
    //Get current state (still/animated)
    var $state = $(this).attr("data-state");
    console.log("$state: " + $state);

    //If image is still then make it animated else make it still
    if($state === "still") {
      $(this).attr("src", $(this).attr("animatedSrc"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("stillSrc"));
      $(this).attr("data-state", "still");
    }

  });


  //Function that runs on page load -----------------------------------------------------------
  $(document).ready(function() {

      $('#search-form').on('submit', handleSearch);
  
      $('#clear').on('click', function() {

          $('#animalGifs, #search-term').empty();
          //$("#animalGifs").empty();
      });

  });

  
