// Set variable for zip-location

// Initialize empty string for a default location set by the user. Until set, will use 10001 (Manhattan, NY)
// let defaultLocation = new String()
const zipInputBar = document.querySelector("#zip-input")

let defaultLocation = new String()

// Intialize variable for searched zip, whether it is default location or inputted by user
let zipSearch = new String()


function searchNewZip () {
  let zipInput = $("#zip-input").val().trim();
  // let weatherCard = document.querySelector(".weatherCard")
  let weatherCard = document.getElementsByClassName("weatherCard")
  let currentWeatherView = document.querySelector("#weather-view")
  let fiveDayView = document.querySelector("#fiveDayView")
  let zipCodeMessage = "Must Enter Valid Zip Code!"
  // let zipCodeMessage = document.querySelector(".zipCodeMessage")
  // let zipCodeFailure = $("<p>").text("Must Enter Valid Zip Code!");
  


  

  if (!( zipInput.length === 5) ) {
    console.log("5")
    // zipCodeMessage.append(zipCodeFailure);
    // zipCodeMessage.innertext = "Must Enter Valid Zip Code!"
    document.querySelector('.zipCodeMessage').innerText=zipCodeMessage;
    return
  } else {
    if ( weatherCard ) {

      currentWeatherView.innerHTML = '';
      fiveDayView.innerHTML = '';
    }
    document.querySelector('.zipCodeMessage').innerText='';  
    displayCurrentWeather(); 
    fiveDayForecast();
    getState(); 
  }

  

  console.log(fiveDayView.childNodes)
  console.log ("zipInput not empty")
  console.log ("zipInput:", zipInput)
  console.log(weatherCard.length)

  console.log("getState", getState())
}

function displayCurrentWeather() {

  let zipInput = $("#zip-input").val().trim();

  if (defaultLocation.length  === 0) {
    console.log("Default Location Empty: Set as 10001")
    defaultLocation = "10001"
    zipSearch = defaultLocation 
  } else {
    zipSearch = zipInput 
  }


  //var zipLocation = $("#data-name").val();
  // var zipLocation = $("#movie-input").val().trim();
  console.log(zipInput)
  console.log(zipSearch)

  // if ( !(zipSearch.length === 0 ) ){
  //   console.log("ToBeSearched:", zipInput)
  //   zipSearch = zipInput
  // } else {
  //   zipSearch = defaultLocation
  // }

  // if (zipLocation.val() === 0)
  //var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=06804,us&appid=cee88101192942cc1ddef8fb37f11635";

  // API call: Current Weather 
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipSearch + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  // Creating an AJAX call for the current weather 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    // Creating a div to hold the current weather
    // var weatherDiv = $("<div class='weatherInfo'>");
    var weatherDiv = $("<div id='currentWeatherView' class='currentWeatherView card bg-light mb-3 weatherCard'>");

  //  class="" style="max-width: 18rem;">

    // Storing the weather data
    var weather = response.weather[0].main;

    // Creating an element to have weather displayed
    // var pOne = $("<p>").text("Weather: " + weather);
    var pOne = $("<p>").text(weather);

    console.log(pOne)

    // Displaying the rating
    weatherDiv.append(pOne);

    // Storing the release year
    var humidity = response.main.humidity;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Humidity: " + humidity + "%");

    // Displaying the release year
    weatherDiv.append(pTwo);

    // Storing the plot
    // var temperature = ((response.main.temp * 1.8) - 459.67);

    var temperature = Math.round( ((response.main.temp * 1.8) - 459.67) );


    // Creating an element to hold the plot
    // var tempDisplay = $("<p>").text("Temp. (F°):"  + temperature.toFixed(1) + "  deg.");
    var tempDisplay = $("<p>").text("Temp. "  + temperature + "°F");

    // Appending the plot
    weatherDiv.append(tempDisplay);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    weatherDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#weather-view").prepend(weatherDiv);
  });

}

function fiveDayForecast() {
  let zipInput = $("#zip-input").val().trim();


  // if ( document.querySelector(".weatherCard") ) {
  //   console.log("toBeDeleted")
  // }

  if (defaultLocation.length  === 0) {
    console.log("Default Location Empty: Set as 10001")
    defaultLocation = "10001"
    zipSearch = defaultLocation 
  }

  //var zipLocation = $("#data-name").val();
  // var zipLocation = $("#movie-input").val().trim();
  //var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipLocation + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipSearch + ",us&appid=cee88101192942cc1ddef8fb37f11635";
  // Creating an AJAX call for the 5 day firecast
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  }).then(function (response) {
    // Iterate over response 5 times for 5-day forecast
    const days = {}
    for (var i = 0; i < response.list.length; i++) {
      let item = response.list[i]
      let day = new Date(item.dt_txt).getDay()
      if (!days[day]) {
        days[day] = item
      }

    } 
    console.log(Object.values("objectValueDays", days))
      console.log("Days", days)
        Object.values(days).forEach(day=>{
           // Creating a div to hold the current weather
          var colDiv= $("<div class='col'>");

          var weatherCard= $("<div class='card bg-light text-black mb-4 weatherCard'>");

          // Storing the weather data
          var weather = day.weather[0].main;

          // Creating an element to have weather displayed
          var pOne = $("<p>").text("Weather: " + weather);
          // console.log(pOne)

          // Displaying the rating
          weatherCard.append(pOne);

          // Storing the release year
          var humidity = day.main.humidity;

          humidity.toFixed(2);

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Humidity: " + humidity + "%");

          // Displaying the release year
          weatherCard.append(pTwo);

          // Storing the plot
          // var temperature = ((day.main.temp * 1.8) - 459.67);

          var temperature = Math.round( ((day.main.temp * 1.8) - 459.67) );



          // Creating an element to hold the plot
          // var tempDisplay = $("<p>").text("Temperature (F): " + temperature.toFixed(1) + "  deg.");
          var tempDisplay = $("<p>").text(temperature + "°F");


          // Appending the plot
          weatherCard.append(tempDisplay);

          // Retrieving the URL for the image
          var imgURL = day.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          weatherCard.append(image);

          // Putting the entire movie above the previous movies
          colDiv.append(weatherCard)
          $("#fiveDayView").prepend(weatherCard);
        })
  });

}

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", "#searchWeather", searchNewZip);
$(document).keypress(function(e) {
  if(e.which == 13) {
    console.log("enter")
    e.preventDefault()

    searchNewZip();
    // displayCurrentWeather(); 
    // fiveDayForecast();
  }
});


$( document ).ready(function() {
  
  // console.log(zipLocation)
  // if (zipInput.length === 0){
    // console.log ("zipInput Empty")
  // if (defaultLocation.length  === 0) {
  //   console.log("Default Location Empty: Set as 10001")
  //   defaultLocation = "10001"
  //   zipSearch = defaultLocation 
  // }

  // } 


  
  console.log( "Document OnLoad" );

  console.log( "Default Zip Location:", defaultLocation );

  // console.log( "Zip Input", zipInput );
  // console.log( "Zip Searched", zipSearch );
  zipInputBar.value = '';


  displayCurrentWeather(); 
  fiveDayForecast();
  getState(); 

  console.log( "Document OnLoad" );

  console.log( "Default Zip Location:", defaultLocation );
  console.log("getState", getState())
  
});

// Determine the state of the searched zip code
function getState() {

  /* Ensure param is a string to prevent unpredictable parsing results */
  if (typeof zipSearch !== 'string') {
      console.log('Must pass the zipcode as a string.');
      return;
  }

  /* Ensure we have exactly 5 characters to parse */
  if (zipSearch.length !== 5) {
      console.log('Must pass a 5-digit zipcode.');
      return;
  }

  /* Ensure we don't parse strings starting with 0 as octal values */
  const zipcode = parseInt(zipSearch, 10);

  let st;
  let state;

  /* Code cases alphabetized by state */
  if (zipcode >= 35000 && zipcode <= 36999) {
      st = 'AL';
      state = 'Alabama';
  } else if (zipcode >= 99500 && zipcode <= 99999) {
      st = 'AK';
      state = 'Alaska';
  } else if (zipcode >= 85000 && zipcode <= 86999) {
      st = 'AZ';
      state = 'Arizona';
  } else if (zipcode >= 71600 && zipcode <= 72999) {
      st = 'AR';
      state = 'Arkansas';
  } else if (zipcode >= 90000 && zipcode <= 96699) {
      st = 'CA';
      state = 'California';
  } else if (zipcode >= 80000 && zipcode <= 81999) {
      st = 'CO';
      state = 'Colorado';
  } else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
      st = 'CT';
      state = 'Connecticut';
  } else if (zipcode >= 19700 && zipcode <= 19999) {
      st = 'DE';
      state = 'Delaware';
  } else if (zipcode >= 32000 && zipcode <= 34999) {
      st = 'FL';
      state = 'Florida';
  } else if ( (zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999) ) {
      st = 'GA';
      state = 'Georgia';
  } else if (zipcode >= 96700 && zipcode <= 96999) {
      st = 'HI';
      state = 'Hawaii';
  } else if (zipcode >= 83200 && zipcode <= 83999) {
      st = 'ID';
      state = 'Idaho';
  } else if (zipcode >= 60000 && zipcode <= 62999) {
      st = 'IL';
      state = 'Illinois';
  } else if (zipcode >= 46000 && zipcode <= 47999) {
      st = 'IN';
      state = 'Indiana';
  } else if (zipcode >= 50000 && zipcode <= 52999) {
      st = 'IA';
      state = 'Iowa';
  } else if (zipcode >= 66000 && zipcode <= 67999) {
      st = 'KS';
      state = 'Kansas';
  } else if (zipcode >= 40000 && zipcode <= 42999) {
      st = 'KY';
      state = 'Kentucky';
  } else if (zipcode >= 70000 && zipcode <= 71599) {
      st = 'LA';
      state = 'Louisiana';
  } else if (zipcode >= 3900 && zipcode <= 4999) {
      st = 'ME';
      state = 'Maine';
  } else if (zipcode >= 20600 && zipcode <= 21999) {
      st = 'MD';
      state = 'Maryland';
  } else if ( (zipcode >= 1000 && zipcode <= 2799) || (zipcode == 5501) || (zipcode == 5544 ) ) {
      st = 'MA';
      state = 'Massachusetts';
  } else if (zipcode >= 48000 && zipcode <= 49999) {
      st = 'MI';
      state = 'Michigan';
  } else if (zipcode >= 55000 && zipcode <= 56899) {
      st = 'MN';
      state = 'Minnesota';
  } else if (zipcode >= 38600 && zipcode <= 39999) {
      st = 'MS';
      state = 'Mississippi';
  } else if (zipcode >= 63000 && zipcode <= 65999) {
      st = 'MO';
      state = 'Missouri';
  } else if (zipcode >= 59000 && zipcode <= 59999) {
      st = 'MT';
      state = 'Montana';
  } else if (zipcode >= 27000 && zipcode <= 28999) {
      st = 'NC';
      state = 'North Carolina';
  } else if (zipcode >= 58000 && zipcode <= 58999) {
      st = 'ND';
      state = 'North Dakota';
  } else if (zipcode >= 68000 && zipcode <= 69999) {
      st = 'NE';
      state = 'Nebraska';
  } else if (zipcode >= 88900 && zipcode <= 89999) {
      st = 'NV';
      state = 'Nevada';
  } else if (zipcode >= 3000 && zipcode <= 3899) {
      st = 'NH';
      state = 'New Hampshire';
  } else if (zipcode >= 7000 && zipcode <= 8999) {
      st = 'NJ';
      state = 'New Jersey';
  } else if (zipcode >= 87000 && zipcode <= 88499) {
      st = 'NM';
      state = 'New Mexico';
  } else if ( (zipcode >= 10000 && zipcode <= 14999) || (zipcode == 6390) || (zipcode == 501) || (zipcode == 544) ) {
      st = 'NY';
      state = 'New York';
  } else if (zipcode >= 43000 && zipcode <= 45999) {
      st = 'OH';
      state = 'Ohio';
  } else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999) ) {
      st = 'OK';
      state = 'Oklahoma';
  } else if (zipcode >= 97000 && zipcode <= 97999) {
      st = 'OR';
      state = 'Oregon';
  } else if (zipcode >= 15000 && zipcode <= 19699) {
      st = 'PA';
      state = 'Pennsylvania';
  } else if (zipcode >= 300 && zipcode <= 999) {
      st = 'PR';
      state = 'Puerto Rico';
  } else if (zipcode >= 2800 && zipcode <= 2999) {
      st = 'RI';
      state = 'Rhode Island';
  } else if (zipcode >= 29000 && zipcode <= 29999) {
      st = 'SC';
      state = 'South Carolina';
  } else if (zipcode >= 57000 && zipcode <= 57999) {
      st = 'SD';
      state = 'South Dakota';
  } else if (zipcode >= 37000 && zipcode <= 38599) {
      st = 'TN';
      state = 'Tennessee';
  } else if ( (zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) ||  (zipcode >= 88500 && zipcode <= 88599) ) {
      st = 'TX';
      state = 'Texas';
  } else if (zipcode >= 84000 && zipcode <= 84999) {
      st = 'UT';
      state = 'Utah';
  } else if (zipcode >= 5000 && zipcode <= 5999) {
      st = 'VT';
      state = 'Vermont';
  } else if ( (zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || (zipcode == 20598) ) {
      st = 'VA';
      state = 'Virginia';
  } else if ( (zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999) ) {
      st = 'DC';
      state = 'Washington DC';
  } else if (zipcode >= 98000 && zipcode <= 99499) {
      st = 'WA';
      state = 'Washington';
  } else if (zipcode >= 24700 && zipcode <= 26999) {
      st = 'WV';
      state = 'West Virginia';
  } else if (zipcode >= 53000 && zipcode <= 54999) {
      st = 'WI';
      state = 'Wisconsin';
  } else if (zipcode >= 82000 && zipcode <= 83199) {
      st = 'WY';
      state = 'Wyoming';
  } else {
      st = 'none';
      state = 'none';
      console.log('No state found matching', zipcode);
  }

  return state;
  // return st;
}


