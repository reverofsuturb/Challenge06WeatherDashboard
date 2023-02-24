//Variable Declarations
var city;
var cityEl = $("#userCity");
var currentWeatherEl = $("#currentWeather");
var WeatherEl = $("#weatherTable");
var searchHistory = $("#searchHistory");
var lat;
var lon;
var today = dayjs();

//pull current local storage

function displayPrevious () {
previousSearches = JSON.parse(localStorage.getItem("Search History"));

//create buttons for previously searched cities if there are any
if (previousSearches !== null) {
  for (var i = 0; i < previousSearches.length; i++) {
    var prevBtn = document.createElement("button");
    prevBtn.textContent = previousSearches[i];
    prevBtn.setAttribute("class", "historyBtn");
    searchHistory.append(prevBtn);
  }
}
}

//create button
function createButton() {
var prevBtn = document.createElement("button");
      prevBtn.textContent = city;
      prevBtn.setAttribute("class", "historyBtn");
      console.log(prevBtn);
      searchHistory.append(prevBtn);
}

//function to save city to local storage
function saveSearch() {
  previousSearches = JSON.parse(localStorage.getItem("Search History"));
  if (previousSearches === null) {
    //checking if there is any storage array yet
    localStorage.setItem("Search History", JSON.stringify([city]));
    createButton();
  } else {
    //if there is storage data already, add it to front of array
    console.log(previousSearches.includes(city));
    if (!previousSearches.includes(city)) {
      previousSearches.unshift(city);
      console.log(previousSearches);
      localStorage.setItem("Search History", JSON.stringify(previousSearches));
      createButton();
  }
}
}
//function to get and show weather
function getAndShowWeather() {
  var APIkey = "c553d4096a25b5d4d72caeabd2a72b94";

  //pulls current weather data
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&cnt=1" +
    "&appid=" +
    APIkey;
  //pulls geocaching API to get lat/lon
  var requestUrl2 =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    APIkey;

  console.log(requestUrl);

  //API fetch current
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        //save if city is found in data
        saveSearch();
      } else {
        alert("Please check your spelling and try again."); //alert if no city found
      }
      return response.json();
    })
    .then(function (data) {
      tempKelvinCurrent = data.list[0].main.temp;
      degFCurrent = Math.floor((tempKelvinCurrent - 273.15) * 1.8 + 32); //convert to F

      //jQuery references to html doc
      var currentIcon = $("#currentIcon");
      var currentWeatherHead = $("#curH");
      var currentTempEl = $("#curTemp");
      var currentWindEl = $("#curWind");
      var currentHumidityEl = $("#curHumidity");

      //Setting current weather values and icon for top box
      currentIcon.attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          data.list[0].weather[0].icon +
          "@2x.png"
      );
      currentWeatherHead.text(
        "Current weather for " + city + " (" + today.format("M/DD/YYYY") + ")"
      );
      currentTempEl.text("Temp:  " + degFCurrent + "\u00B0 F");
      currentWindEl.text("Wind:  " + data.list[0].wind.speed + " mph");
      currentHumidityEl.text("Humidity:  " + data.list[0].main.humidity + "%");
      currentWeatherEl.attr("alt", "Current weather for " + city + ".");
    });

  //API fetch geocaching to get lat/lon
  fetch(requestUrl2)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //save lat and lon
      lat = data[0].lat;
      lon = data[0].lon;

      //API to pull 5 day forecast
      requestUrl3 =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=" +
        APIkey;
      //fetch 5 day data
      fetch(requestUrl3)
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var j = 0; //used to iterate through day cards

          //create 5 day forecast dashboard
          for (var i = 0; i < data.list.length; i = i + 7) {
            //pulls data from each time period and store as variable
            var Temp = data.list[i].main.temp;
            var Wind = data.list[i].wind.speed;
            var Humidity = data.list[i].main.humidity;
            console.log(Humidity);
            var forecastDay = Number(data.list[i].dt_txt.slice(8, 10));
            var forecastMonth = Number(data.list[i].dt_txt.slice(5, 7));
            var forecastYear = data.list[i].dt_txt.slice(0, 4);

            //Use jQuery to reference element and add corresponding data
            var iconEl = $("#day" + j + "icon");
            iconEl.attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                data.list[i].weather[0].icon +
                "@2x.png"
            );
            var dateEl = $("#day" + j + "date");
            dateEl.text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
            var tempEl = $("#day" + j + "temp");
            tempEl.text("Temp:  " + Temp + "\u00B0 F");
            var windEl = $("#day" + j + "wind");
            windEl.text("Wind:  " + Wind + " mph");
            var humidEl = $("#day" + j + "hum");
            humidEl.text("Humidity:  " + Humidity + "%");
            j++;
          }
        });
    });
}

//Default location set to Denver
city = "Denver";
displayPrevious();
getAndShowWeather();

//listen for searchHistory click
searchHistory.on("click", function (event) {
  event.preventDefault();
  city = event.target.textContent;
  getAndShowWeather();
});

//listen for city search
$("#citySearch").on("submit", function (event) {
  event.preventDefault();
  city = cityEl.val();
  getAndShowWeather();
});
