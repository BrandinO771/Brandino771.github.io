// from data.js
/*
var tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
        cell.text(val);
      }
    );
  });
}

function handleClick() {

  // Grab the datetime value from the filter
  var date = d3.select("#datetime").property("value");
  let filteredData = tableData;

  // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  }

  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
*/
let testObj ={
  datetime: "05/04/2021",
  city: "Boogy Ville",
  state: "CA",
  country: "US",
  shape: "Trapizoid",
  durationMinutes: "1000 mins.",
  comments: "this is test comments my main man!"
}

/*
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //  document.getElementById("demo").innerHTML = this.responseText;
    console.log('this is the response',this.responseText )
    }
  };
  xhttp.open("GET", "static/js/test_data.json", true);
  xhttp.send();
}

loadDoc();

*/
if (!('fetch' in window)) {
  console.log('Fetch API not found, try including the polyfill');
}
if ('fetch' in window) {
  console.log('Fetch API was found');
}

var update1 = { location : "Crazy Land", status : "Insane"};
// myMemory.location = document.getElementById('location').value;
// myMemory.description = document.getElementById('description').value;
// Now save myMemory to localStorage,this can be done on a form submission or a button press. We can store as an array of memories and add item to it every time.

//if user already has memories in local, get that array and push into it.
//else create a blank array and add the memory.
// https://stackoverflow.com/questions/23728626/localstorage-and-json-stringify-json-parse

/*
function updateMyLocalStorage( updateItem){
mytestLocalStorage = localStorage.getItem('mytestLocalStorage') ?
              JSON.parse(localStorage.getItem('mytestLocalStorage')) : 
              [];
mytestLocalStorage.push(updateItem);
localStorage.setItem('mytestLocalStorage', JSON.stringify(mytestLocalStorage));

console.log('mytestLocalStorage ', mytestLocalStorage)
}
*/
//updateMyLocalStorage({ location : "Crazy Land", status : "Insane"})

function queryMyStorage( queryKey, queryValue)
{
  // myLocalJsonStorage = localStorage.getItem('mytestLocalStorage') 
  myLocalJsonStorage = JSON.parse(localStorage.getItem('mytestLocalStorage'))
  console.log('mytestLocalStorage ', myLocalJsonStorage, 'type of myLocalJsonStorage', typeof( myLocalJsonStorage))
  filteredData = myLocalJsonStorage.filter(row => row[queryKey] === queryValue );
  console.log(`filteredResponse is ${filteredData} `)
  finalFilter = []
  for ( x of filteredData )
      {
        finalFilter.push(x)
        console.log('filteredResponse is', x)
      }

  console.log('final filter is', finalFilter)
}
/*
    function uniqueifyMyStorage( fileName )
      {
        // myLocalJsonStorage = localStorage.getItem('mytestLocalStorage') 
        myLocalJsonStorage = JSON.parse(localStorage.getItem('mytestLocalStorage'))
          console.log('mytestLocalStorage ', myLocalJsonStorage, 'type of myLocalJsonStorage', typeof( myLocalJsonStorage))
          dupeRemover =[]
          // myLocalJsonStorage = myLocalJsonStorage.split(',')
          for(i of myLocalJsonStorage){
              console.log("this is each item of myLocalJsonStorage",i)
              console.log("this is each location of myLocalJsonStorage",i.location)
              //>>ENSURE ALL ENTRIES ARE UNIQUE
              filteredData = dupeRemover.filter(row => row.location == i.location && row.status == i.status);
              console.log(`filteredResponse is ${filteredData} `)
              if(filteredData.length == 0) dupeRemover.push(i)
             }
            console.log('dupeRemover', dupeRemover)

        localStorage.setItem('mytestLocalStorage', JSON.stringify(dupeRemover));
            // console.log( dupeRemover.location.includes("Texas") )
            // console.log( dupeRemover[0].location )

    // console.log('this is tofilter', toFilter , 'to filter is a,', typeof(toFilter))
    // filteredData = myLocalJsonStorage.filter(row => row[queryKey] === queryValue);
    // filteredData = myLocalJsonStorage.filter(row => row.location != "");
    // console.log(`filteredResponse is ${filteredData} `)
    // for ( x of filteredData )
    //     console.log(x)
    // console.log(`queryKey is ${queryKey } queryValue is ${ queryValue }  filteredResponse is ${filteredData} `)
}
*/
/*
viewMyStorage()
queryMyStorage( 'location', 'Crazy Land' )
uniqueifyMyStorage()
*/
viewMyStorage()

function viewMyStorage()
  {
    myLocalJsonStorage = JSON.parse(localStorage.getItem('mytestLocalStorage'))
    console.log('mytestLocalStorage ', myLocalJsonStorage)
  }

/*  
var myMemory = {};
myMemory.location = document.getElementById('location').value;
myMemory.description = document.getElementById('description').value;
Now save myMemory to localStorage,this can be done on a form submission or a button press. We can store as an array of memories and add item to it every time.

//if user already has memories in local, get that array and push into it.
//else create a blank array and add the memory.
memories = localStorage.getItem('memories') ?
              JSON.parse(localStorage.getItem('memories')) : 
              [];
memories.push(myMemory);
localStorage.setItem('memories', JSON.stringify(memories));
*/

/*
fetch('static/js/test_data.json')
.then(function(response) {
  // Do stuff with the response
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
*/

/*
function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem: \n', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function fetchJSON(pathToResource) {
  fetch(pathToResource) // 1
  .then(validateResponse) // 2
  .then(readResponseAsJSON) // 3
  .then(logResult) // 4
  .catch(logError);
}

fetchJSON('static/js/test_data.json');
*/
// let test_table = data.data;
// console.log('here is test_table', test_table)
// function runTest(){
// //  let importedData  = data 
// //  importedData.push(testObj);
// //  data = testObj
// // console.log('here is importedData updated', importedData)
//   // appendToData(testObj);
//   let request = new XMLHttpRequest();
//   // let request = json
//   request.responseType = 'json'; // now we're getting a string!
//   request.open('GET', 'test_data.json');
//   request.send();
//   let test_json = request.response;
//   console.log('test_json', JSON.parse(test_json))

// }
// runTest();

// $.getJSON("test_data.json", function(json) { 
// 	console.log(json); // show the JSON file content into console 
// }); 
/*
function loadJSON(filePath, success, error) 
{ 
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = function() 
	{ 
		if (xhr.readyState === XMLHttpRequest.DONE) { 
			if (xhr.status === 200) { 
				if (success) 
					success(JSON.parse(xhr.response)); 
		} else { 
			if (error) {
				error(xhr); 
        console.log('error opening your stupid file')
      }
			} 
		} 
	}; 
	xhr.open("GET", filePath, true); 
	xhr.send(); 
} 

loadJSON('static/js/test_data.json')
*/
//https://www.youtube.com/watch?v=lv_DOIQj8hA

/*
var xhr = new XMLHttpRequest(); 
function loadMyJson(){
xhr.onreadystatechange = function() 
{ 
  if (xhr.readyState == 4) { 
       console.log('We got the file baby', xhr.repsonse)
    }
    xhr.send();
};
xhr.open("Get", "static/js/test_data.json", true);
xhr.send();
}
loadMyJson();
*/

// readTextFile("test_data.json", function(text){
//   var data = JSON.parse(text);
//   console.log(data);
// });
// test_data1 = 'test_data.json' 

// console.log( JSON.parse(test_data))
// console.log(JSON.stringify(test_data)); 

// const dataJson = require('test_data.json');
// console.log(dataJson);

// fetch("test_data.json")
// .then(response => {
//    return response.json();
// })
// .then(data => console.log(data));

// function readTextFile(file, callback) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.responseType = 'json';
//   rawFile.overrideMimeType("application/json");
//   rawFile.open("GET", file, true);
//   rawFile.onreadystatechange = function() {
//       if (rawFile.readyState === 4 && rawFile.status == "200") {
//           callback(rawFile.response);
//       }
//   }
//   rawFile.send(null);
// }

// //usage:
// readTextFile("test_data.json", function(text){
//   var data = JSON.parse(text);
//   console.log(data);
// });


// function loadJSON(callback) {   

//   var xobj = new XMLHttpRequest();
//       xobj.overrideMimeType("application/json");
//   xobj.open('GET', 'test_data.json', true); // Replace 'my_data' with the path to your file
//   xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//           callback(xobj.response);
//         }
//   };
//   xobj.send(null);  
// }

// function init() {
//   loadJSON(function(response) {
//    // Parse JSON string into object
//      var actual_JSON = JSON.parse(response);
//      console.log(actual_JSON)
//      t =document.getElementById('test')
//      t.innerHTML += actual_JSON
//   });
//  }

// function makeIt()
//   {
//    t= document.createElement('DIV')
//    t.id = 'test'
//    document.body.append(t)
//   }
// makeIt()
//  init()