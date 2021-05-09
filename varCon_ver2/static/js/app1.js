

let testObj ={
  datetime: "05/04/2021",
  city: "Boogy Ville",
  state: "CA",
  country: "US",
  shape: "Trapizoid",
  durationMinutes: "1000 mins.",
  comments: "this is test comments my main man!"
}




function Upload() {
      var fileUpload = document.getElementById("fileUpload");
      // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.json)$/;

      if (regex.test(fileUpload.value.toLowerCase())) {
          if (typeof (FileReader) != "undefined") {
              var reader = new FileReader();
              reader.onload = function (e) {
               console.log( e.target.result)
                  var table = document.createElement("table");
                  var rows = e.target.result.split("\n");
                 
                  for (var i = 0; i < rows.length; i++) {
                      var cells = rows[i].split(",");
                      if (cells.length > 1) {
                          var row = table.insertRow(-1);
                          for (var j = 0; j < cells.length; j++) {
                              var cell = row.insertCell(-1);
                              cell.innerHTML = cells[j];
                          }
                      }
                  }
                  var dvCSV = document.getElementById("dvCSV");
                  dvCSV.innerHTML = "";
                  dvCSV.appendChild(table);
              }
              reader.readAsText(fileUpload.files[0]);
              console.log('reader is ', reader)
           
          } else {
              alert("This browser does not support HTML5.");
          }
      } else {
          alert("Please upload a valid CSV file.");
      }
  }



var update1 = { location : "Crazy Land", status : "Insane"};
// myMemory.location = document.getElementById('location').value;
// myMemory.description = document.getElementById('description').value;
// Now save myMemory to localStorage,this can be done on a form submission or a button press. We can store as an array of memories and add item to it every time.

//if user already has memories in local, get that array and push into it.
//else create a blank array and add the memory.
// https://stackoverflow.com/questions/23728626/localstorage-and-json-stringify-json-parse
function updateMyLocalStorage( updateItem){
    mytestLocalStorage = localStorage.getItem('mytestLocalStorage') ?
                JSON.parse(localStorage.getItem('mytestLocalStorage')) : 
                [];
    mytestLocalStorage.push(updateItem);
    localStorage.setItem('mytestLocalStorage', JSON.stringify(mytestLocalStorage));

    console.log('mytestLocalStorage ', mytestLocalStorage)
}

//updateMyLocalStorage({ location : "Crazy Land", status : "Insane"})
/*
function queryMyStorage( queryKey, queryValue)
{
  // myLocalJsonStorage = localStorage.getItem('mytestLocalStorage') 
  // myLocalJsonStorage = JSON.parse(localStorage.getItem('mytestLocalStorage'))
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
*/

/*
    function uniqueifyMyStorage( fileName )
      {
        // myLocalJsonStorage = localStorage.getItem('mytestLocalStorage') 
        // myLocalJsonStorage = JSON.parse(localStorage.getItem('mytestLocalStorage'))
        //   console.log('mytestLocalStorage ', myLocalJsonStorage, 'type of myLocalJsonStorage', typeof( myLocalJsonStorage))
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
}
*/
// viewMyStorage()

function viewMyStorage()
  {
    myLocalJsonStorage = JSON.parse(localStorage.getItem('mytestLocalStorage'))
    console.log('mytestLocalStorage ', myLocalJsonStorage)
  }


  //////////////////////////////////////////////////////////////////
/// DOWNLOAD TABLE TO CSV
//////////////////////////////////////////////////////////////////
function downloader(table_id)/// DOWNLOAD CSV  with data of obj key values 
{
//  https://www.developintelligence.com/blog/2017/04/use-javascript-to-export-your-data-as-csv/
    ///this receives a number from a button that correlates to 
    ///the position of the list in the master array for us to unpack and download
    ////// DOWNLOAD CSV //////////
  the_data = getRowData(table_id);
  // data =  the_data
// if ( the_data.length > 0)
//       {
        keys = Object.keys(the_data[0]); //makes headers 

        result = '';
        result += keys.join(',');
        result += '\n';

        the_data.forEach(function(item) {  //breaks data into lines
          ctr = 0;
          keys.forEach(function(key) {
          if (ctr > 0) result += ',';
          result += item[key];
          ctr++;
          });
        result += '\n';
        });

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(result); //encode result as csv
        hiddenElement.target = '_blank';
        // hiddenElement.download = `vc_dailyLog${vtable_title}.csv`;
        hiddenElement.download = `vc_dailyLog.csv`;
        hiddenElement.click();
  
  //////////////////////////////////////////////
  }
