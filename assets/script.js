var city;
var cityEl = $("#userCity");
var WeatherEl = $("#weatherTable");

//clear text input example on focus
cityEl.on("focus", function () {
  cityEl.val("");
});

//listen for city search
$("#searchBtn").on("click", function () {
  city = cityEl.val();
  //   console.log(city);
  if (localStorage.getItem("Search History") === null) {
    localStorage.setItem("Search History", city);
  } else {
    console.log(localStorage.getItem("Search History"));
  }
  cityEl.val("");
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
      console.log(data);
      console.log(data.list);
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var link = document.createElement("a");

        // set demo will remove**
        link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // append demo will remove**
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
});
