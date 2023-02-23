var city;
var cityEl = $("#userCity");
var currentWeatherEl = $("#currentWeather");
var WeatherEl = $("#weatherTable");
var searchHistory = $("#searchHistory");
var lat;
var lon;
var today = dayjs();

previousSearches = JSON.parse(localStorage.getItem("Search History"));
console.log(previousSearches);

//create buttons for previously searched cities
if (previousSearches !== null) {
  for (var i = 0; i < previousSearches.length; i++) {
    var prevBtn = document.createElement("button");
    prevBtn.textContent = previousSearches[i];
    prevBtn.setAttribute("class", "historyBtn");
    searchHistory.append(prevBtn);
  }
}

//function to save city to local storage
function saveSearch() {
  if (previousSearches === null) {
    localStorage.setItem("Search History", JSON.stringify([city]));
  } else {
    console.log(previousSearches.includes(city));
    if (!previousSearches.includes(city)) {
      previousSearches.unshift(city);
      console.log(previousSearches);
      localStorage.setItem("Search History", JSON.stringify(previousSearches));

      //create button
      var prevBtn = document.createElement("button");
      prevBtn.textContent = city;
      prevBtn.setAttribute("class", "historyBtn");
      console.log(prevBtn);
      searchHistory.append(prevBtn);
    }
  }
}
function getAndShowWeather() {
  var APIkey = "c553d4096a25b5d4d72caeabd2a72b94";
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey;
  var requestUrl2 =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    APIkey;

  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      console.log(response.status);
      if (response.status === 200) {
        saveSearch();
      } else {
        alert("Please check your spelling and try again.");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list);
      console.log(data.list[0]);
      tempKelvinCurrent = data.list[0].main.temp;
      degFCurrent = Math.floor((tempKelvinCurrent - 273.15) * 1.8 + 32);
      console.log(degFCurrent);
      currentWeatherHead = document.createElement("h5");
      currentTempEl = document.createElement("p");
      currentWindEl = document.createElement("p");
      currentHumidityEl = document.createElement("p");
      var currentIcon = $("#currentIcon");
      var currentWeatherHead = $("#curH");
      var currentTempEl = $("#curTemp");
      var currentWindEl = $("#curWind");
      var currentHumidityEl = $("#curHumidity");

      //Setting current weather values for top box

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
      //Append current city and weather info
      currentWeatherEl.append(
        currentIcon,
        currentWeatherHead,
        currentTempEl,
        currentWindEl,
        currentHumidityEl
      );
      // for (var i = 0; i < 5; i++) {
      //   // Creating elements, tablerow, tabledata, and anchor
      //   var createTableRow = document.createElement("tr");
      //   var tableDay = document.createElement("th");
      //   var tableData = document.createElement("td");
      //   var link = document.createElement("a");

      //   // set demo will remove**

      //   // append demo will remove**
      //   tableData.appendChild(link);
      //   createTableRow.appendChild(tableData);
      //   tableBody.appendChild(createTableRow);
      // }
    });

  fetch(requestUrl2)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;
      console.log(lat);
      console.log(lon);
      requestUrl3 =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=" +
        APIkey;
      fetch(requestUrl3)
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var j = 0;

          //create 5 day forecast dashboard
          for (var i = 0; i < data.list.length; i = i + 7) {
            var Temp = data.list[i].main.temp;
            var Wind = data.list[i].wind.speed;
            var Humidity = data.list[i].main.humidity;
            console.log(Humidity);
            var forecastDay = Number(data.list[i].dt_txt.slice(8, 10));
            var forecastMonth = Number(data.list[i].dt_txt.slice(5, 7));
            var forecastYear = data.list[i].dt_txt.slice(0, 4);

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

//listen for searchHistory click
searchHistory.on("click", function (event) {
  event.preventDefault();
  console.log(event.target.textContent);
  city = event.target.textContent;
  getAndShowWeather();
});

//listen for city search
$("#citySearch").on("submit", function (event) {
  event.preventDefault();
  city = cityEl.val();
  console.log(city);

  getAndShowWeather();
});
