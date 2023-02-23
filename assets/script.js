// var APIKey = "00c728b2ec9889aa99a1c18ebb53335d";
// // openweathermap.org API key

// var queryURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   APIKey;
// using for fetch/queries

// // func demo will remove**
// function getApi() {
//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       //loop demo will remove**
//       for (var i = 0; i < data.length; i++) {
//         // Creating elements, tablerow, tabledata, and anchor
//         var createTableRow = document.createElement("tr");
//         var tableData = document.createElement("td");
//         var link = document.createElement("a");

//         // set demo will remove**
//         link.textContent = data[i].html_url;
//         link.href = data[i].html_url;

//         // append demo will remove**
//         tableData.appendChild(link);
//         createTableRow.appendChild(tableData);
//         tableBody.appendChild(createTableRow);
//       }
//     });
// }

var city;
var cityEl = $("#userCity");
var currentWeatherEl = $("#currentWeather");
var WeatherEl = $("#weatherTable");

//clear text input example on focus
cityEl.on("focus", function () {
  cityEl.val("");
});

//listen for city search
$("#searchBtn").on("click", function () {
  city = cityEl.val();
  // console.log(city);
  if (localStorage.getItem("Search History") === null) {
    localStorage.setItem("Search History", city);
  } else {
    console.log(localStorage.getItem("Search History"));
  }
  // cityEl.val("");
  //API key:  c553d4096a25b5d4d72caeabd2a72b94
  requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=c553d4096a25b5d4d72caeabd2a72b94";
  //   console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.list);
      // console.log(data.list[0]);
      console.log(data.list[0]);
      tempKelvinCurrent = data.list[0].main.temp;
      degFCurrent = Math.floor((tempKelvinCurrent - 273.15) * 1.8 + 32);
      console.log(degFCurrent);
      currentWeatherHead = document.createElement("h1");
      currentTempEl = document.createElement("p");
      currentWindEl = document.createElement("p");
      currentHumidityEl = document.createElement("p");

      //Setting current weather values for top box
      var today = dayjs();
      currentWeatherHead.textContent =
        city + "(" + today.format("M/DD/YYYY") + ")";
      currentTempEl.textContent = "Temp:  " + degFCurrent + "\u00B0 F";
      currentWindEl.textContent = "Wind:  " + data.list[0].wind.speed + " mph";
      currentHumidityEl.textContent =
        "Humidity:  " + data.list[0].main.humidity + "%";
      //Append current city and weather info
      currentWeatherEl.append(
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
});
