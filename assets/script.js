var APIKey = "00c728b2ec9889aa99a1c18ebb53335d";
// openweathermap.org API key

// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// using for fetch/queries

// func demo will remove**
// function getApi() { 

//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)


//       //loop demo will remove**
//       for (var i = 0; i < data.length; i++) {
//         // Creating elements, tablerow, tabledata, and anchor
//         var createTableRow = document.createElement('tr');
//         var tableData = document.createElement('td');
//         var link = document.createElement('a');

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