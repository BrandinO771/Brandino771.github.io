

let all_table_data =[]
let pageGenerateJSON = [];
let uploadedData = []
let dataHasPopulated_PageOnce = false
let dataHasPopulated_DatesOnce = false
let tempForUpdateTheUploadedData =[]
let overrideThisDate =''
let newFileProcessStarted = false
// let tempUploadedData=[]

/////////////////////////////////////////////////
//>> GIVE JSON FILE TO OTHER FUNC
/////////////////////////////////////////////////
// function giveJsonToAnotherFunc()
//   {
//   console.log('giveJsonToAnotherFunc() called uploadedData = ', uploadedData)
//   return uploadedData;
//   }

 function toggleMenuOpts(id, value)
 {
  //  console.log('this would hide file buttons')
  if ( value == true )document.getElementById(id).style.display ="block"
  if ( value == false ) document.getElementById(id).style.display ="none"
 }

 function makeVisible(divId, displayConent)
  {

    document.getElementById(divId).style.visibility = 'visible'
    if(displayConent) document.getElementById(divId).style.display = 'block'
  }

  function makeInvisible(divId)
  {
    document.getElementById(divId).style.visibility = 'hidden'
  }

function resetAllSaveButtons()
{
  //save buttons, override buttons, checkbox div = hidden
  document.getElementById('confirmOverWriteButtonsDiv').style.visibility = 'hidden'
  document.getElementById('confirmSaveButtonsDiv').style.visibility = 'hidden'
  document.getElementById('checkBoxSaveNewFileDiv').style.visibility = 'hidden'
  document.getElementById('buttonOverwriteJson').style.visibility = 'hidden'
  document.getElementById('saveNewFileCheckBoxId').checked = false
  document.getElementById('confirmClearFormButtonsDiv').style.display ="none"
}

/////////////////////////////////////////////////
//>> SAVE ALL FORM DATA
/////////////////////////////////////////////////
function saveAllFormData()
{
dateInput = document.getElementById('userDateInput')
let d = dateInput.value
checkBox =false;
checkBox = document.getElementById('saveNewFileCheckBoxId').checked 


  if(checkBox==false){ 
     getallData(d);
  }

  if(checkBox==true){ 
     getallData(d, true);
  }
}

function checkIfCanSave()
  {
    checkBox=false
    dateInput = document.getElementById('userDateInput')
    let d = dateInput.value
    // console.log( 'dateInput =' , dateInput , 'd = ', d , 'd.length =', d.length)
    dateInput.style.backgroundColor = 'none'

    if( d.length==10 && dataHasPopulated_DatesOnce  )//eligible to save
     {
      makeVisible('confirmSaveButtonsDiv')
     }
    
    if( d.length < 10 && dataHasPopulated_DatesOnce )
      {
        dateInput.style.backgroundColor = 'pink'
        alert(`<< ERROR - DATE MISSING >> 
        (1) Please input date for this Form in Upper Right Date Field
        (2) Then Hit Save  `)
      }
    if( d.length < 10 && dataHasPopulated_DatesOnce ==false)
      {
        dateInput.style.backgroundColor = 'pink'
        alert(`<< ERROR >> 

        DATE MISSING 

        (1) Please input DATE for this Form in Upper Right Date Field
        (2) Then Hit Save  `)
        dateInput.backgroundColor = 'pink'
      }

    if( d.length == 10 && dataHasPopulated_DatesOnce == false )
        {
        checkBox = document.getElementById('saveNewFileCheckBoxId').checked 
        if( checkBox == false  ) 
          {
            alert(` << ERROR - UPLOAD DATA MISSING >> ,
            -- DID YOU WANT TO SAVE A BRAND NEW JSON FILE ?
            IF YES :
            (1) Click on SAVE BRAND NEW FILE BOX 
            (2) Then Press SAVE

            IF NO : 
            (1) Please Upload a .JSON File
            (2) Then Hit Save  `
            )

            makeVisible("checkBoxSaveNewFileDiv")
         }
        if( checkBox == true )  makeVisible('confirmSaveButtonsDiv')
      }
}

/////////////////////////////////////////////////
//>>BUTTON id='buttonLoadJSONByDate'  RUNS THIS FUNCTION
/////////////////////////////////////////////////
function runUnpackJson()
{
  //get date from drop down//button runs this function 
  if ( dataHasPopulated_PageOnce) { runDeleteAllRows(); }
  let date=''
  date = document.getElementById('dropDownSelSavedDate')
  // console.log('here is date', date)
  dateHasDash = 0
  dateHasBackSlash =0
  formatAndLength = ''
  //DO Date Validation 
  if( date.value.includes('/')  )  dateHasBackSlash = 1
  if( date.value.includes('-')  )
    { 
    dateSplit = date.value.split('-')
    // console.log('dateSplit =', dateSplit)
    if ( date.value.length == 10){
      if(dateSplit[0].length==4 && dateSplit[1].length==2 && dateSplit[2].length==2  )
          formatAndLength = 'good'
       }
  }

  if ( formatAndLength == 'good' && dataHasPopulated_DatesOnce )
      { 
        unpackLoadJSONByData( uploadedData, date.value) 
        dataHasPopulated_PageOnce = true
        date.style.backgroundColor = 'none'
      }
   if ( formatAndLength.length == 0 && dataHasPopulated_DatesOnce)
      {
        date.style.backgroundColor = 'red'
        alert(`<< ERROR - INVALID DATE >>>
        Input a valid date in format "YYYY-MM-DD" Like "2021-05-09"`)
      }
      if ( dataHasPopulated_DatesOnce == false)
      {
        alert(`<< ERROR - UPLOAD DATA MISSING >>>
            You Have Not loaded the Master Data, 
            (1) Click 'See Menu Options'
            (2) Press 'Choose A File'
            (3) Press the 'Upload Selected File' Button 
            (4) Then "Select" or "Input" a Valid Date 
            (5) Then Press the Button  "Load By Date" `)
      }
}

//////////////////////////////////////////////////////
//>> POPULATE DROP DOWN BY JSON DATES 
//////////////////////////////////////////////////////
function popluateDropDownJSONDates()
  {
    dataList=document.getElementById('savedDates')

    if( dataHasPopulated_DatesOnce) dataList.innerHTML =''

    for( key of  Object.keys( uploadedData[0] ) )
        {
          opt=document.createElement('option')
          opt.text = key
          dataList.append(opt)
        }
        dataHasPopulated_DatesOnce=true
  }

//////////////////////////////////////////////////////


/////////////////////////////////////////////////
// GATHER CONVERT ALL TABLES DATA TO JSON
/////////////////////////////////////////////////
function getallData(date, newfile)
{
  isNewFile = newfile || false
  all_table_ids = [ 'expenses_table', 'income_table', 'labor_table']
  let table_dic = { project : '',  description : '', amount : '' , method : ''}
  let table_dic2= {  employee_name : '',  job_site : '', hours : '' }
 let todays_date = date || ''
 if(todays_date.length==0) todays_date = theDate();
  all_table_data= { [todays_date] : {} }
  // console.log('all_table_data init', all_table_data)
  userDateForKey = ''
  userDateForKey = document.getElementById('userDateInput').value
  overrideThisDate =''
  dataInputCt =0

  for ( let id of all_table_ids )
    {
      theTableRow=document.getElementById(id).getElementsByTagName('td')
      ct = 1 
      dict_key = { id : [] }
      rows_array = []
      dataInputCt =0
      
      for( cell of theTableRow )
        {
          if ( id != 'labor_table')///HERE WE HAVE 5 COLUMNS BUT WE ONLY WANT 4, AND WE DONT WANT THE LAST ROW, THE LAST ROW WILL BE ITERATED BUT HAS NOT CHILDREN SO WILL NOT BE RECORDED
            {
              // console.log('this is cell of row', cell)
              // console.log('this is cell of row row.children[0]', cell.children[0])
              if ( cell.children.length > 0 )
              if ( cell.children.length > 0 && ct<=4 )
                  {
                    // console.log('this is cell of row row.children[0].value', cell.children[0].value)
                    v = cell.children[0].value
                    if ( v.length > 0 &&  v !='0.00') dataInputCt +=1

                    // console.log('this is v.length', v.length, 'this is v ', v, 'this is ct', dataInputCt)
                    if ( ct ==1 ) table_dic.project = v
                    if ( ct ==2 ) table_dic.description = v
                    if ( ct ==3 ) table_dic.amount = parseFloat( v )
                    if ( ct ==4 ) 
                              {
                                  table_dic.method = v
                                 if ( dataInputCt > 0 ) rows_array.push(table_dic)//only save row if it contains at least one data input 
                                  table_dic ={  project : '',  description : '', amount : '' , method : '' }
                                  dataInputCt =0
                              }
                  }
              ct +=1
              if(ct==6) ct=1 //exiting reseting
            }

          if ( id == 'labor_table')//THERE ARE 4 COLUMNS WE ITERATE THROUGH ALL BUT ONLY WANT 3 OF 4 AND WE ARE SYNCHING OUR COUNT WITH OUT ITERATION
            {
              // console.log('TOP Labor Table the count = <', ct, '> table_dic2 = ', table_dic2 )
              if ( cell.children.length > 0  && ct<= 3)
                  {
                    // console.log('this is labor cell of row row.children[0].value', cell.children[0].value)
                    v = cell.children[0].value
                    if ( v.length > 0  &&  v !='0.00') dataInputCt +=1
                    if ( ct ==1 ) table_dic2.employee_name = v
                    if ( ct ==2 ) table_dic2.job_site = v
                    if ( ct ==3 ) table_dic2.hours = parseFloat( v )
                  }
              if ( ct == 3 )
                  {
                    if ( dataInputCt > 0 )  rows_array.push(table_dic2) //only save row if it contains at least one data input 
                    table_dic2 = {  employee_name : '',  job_site : '', hours : '' }
                    dataInputCt =0
                  }
                // console.log('BOTTOM Labor Table the count = <', ct, '> table_dic2 = ', table_dic2 )
              ct +=1
              if(ct==5) ct=1 //exiting reseting
            }
       }//>>END LOOPING THROUGH ALL CELLS OF A TABLE
       all_table_data[todays_date][id] = rows_array ;//FULLY UPDATE MASTER DICT WITH ALL KEY VALUES FOR TABLE
    }//>>END OF ALL LOOPS 

     console.log( 'all_table_data' , all_table_data)

    if( isNewFile == false)
    {
    //>> Alert If Date Already Exists 
    if( typeof(uploadedData[0][todays_date]) != 'undefined'  )
    {
      makeVisible('buttonOverwriteJson');
      overrideThisDate = todays_date;
      alert(`You already have "Data" saved for this DATE, 
      (1) After you close this window, 
      (A) If You want to Update the file with this data:
           1. Click on the "UPDATE" button below 
      (B) If you did this in error then:
          1. Specify a different Date in Upper Right Hand Date Field 
          2. and Hit Save Again`);
      }
 
    if( typeof(uploadedData[0][todays_date]) == 'undefined' ){
        uploadedData[0][todays_date] = all_table_data[todays_date]
        // console.log( 'THIS IS FIRST ENTRY FOR THIS DATE, uploadedData =' , uploadedData)
        saveJSON(uploadedData)
       }
    }
    if(isNewFile==true) saveJSON( [{ [todays_date] : all_table_data[todays_date]}] )
}
//////////////////////////////////////////////////////

function overWriteJSONData(){
  // console.log('this is uploaded data before update', uploadedData[0][overrideThisDate] )
  uploadedData[0][overrideThisDate] = all_table_data[overrideThisDate]
  // console.log('this is uploaded after before update', uploadedData[0][overrideThisDate] )
  saveJSON(uploadedData)
}


/////////////////////////////////////////////////
//>> POPULATE ALL TABLES WITH JSON -- BY SPECIFIC DATE
/////////////////////////////////////////////////
function unpackLoadJSONByData( jsonData, date)//>> USER will load form by Specific Date entry in the JSON
{
// console.log('this is jsonData', jsonData)
// console.log('this is jsonData[date]', jsonData[0][date])

  for( key of  Object.keys( jsonData[0][date]))
    {
      // console.log('this is the key for the Object', key)
      for ( g of jsonData[0][date][key])
      {
        // console.log('this should be each row of grp', g)
        if( key == 'expenses_table') addRow(key, 'no', g )
        if( key == 'income_table') addRow(key, 'yes', g )
        if( key == 'labor_table') addRowLabor( g )
      }
    }
}



//////////////////////////////////////////////////////
//>> UPDATE THE FILE UPLOAD USER UI TEXT 
//////////////////////////////////////////////////////
function updateFileUI1(id)
{
  resetAllSaveButtons();
  f  =document.getElementById('data_fileSelected_text_ui1')
  d  =document.getElementById('fileUpload1').value//this is the file name
  fn =document.getElementById('data_fileName_text_ui1')
    // console.log('updateFileUI')

    if(id == 'fileUpload1')
        {
        f.textContent ='A FILE IS BEING SELECTED' 
        f.style.color ='blue'
        }
    if(id == 'data_fileUploaded_text_ui1')
        {
        if( d.value != "No file Chosen")
          {
          f.textContent ='A FILE IS SELECTED ' 
          fl=document.getElementById(id)
          fl.textContent ='THE FILE NAME LOADED IS: '
          fl.style.color ='blue'
          fn.textContent=''
          fn.textContent += d.split('\\')[2] 
          }
        }
}  


//////////////////////////////////////////////////////
//>> IMPORT JSON FILE  -- INTO JS MEMORY
//////////////////////////////////////////////////////
function Upload() {
    uploadedData = []
      var fileUpload = document.getElementById("fileUpload1");
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.json)$/;
      // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/; //if opening txt or csv 

      if (regex.test(fileUpload.value.toLowerCase())) {
          if (typeof (FileReader) != "undefined") {
              var reader = new FileReader();
              reader.onload = function (e) {
                // uploadedData.push(JSON.parse(e.target.result))
              // console.log("parsed json data =", JSON.parse(e.target.result) )
              uploadedData = JSON.parse(e.target.result);
              popluateDropDownJSONDates();
              // console.log('this is uploadedData',  uploadedData)
              updateFileUI1('data_fileUploaded_text_ui1')
              }
              reader.readAsText(fileUpload.files[0]);
              // console.log('reader is ', reader)
        } else { alert("This browser does not support File Reader."); }
        } else { alert(`<< ERROR >> Please Choose JSON File :
              (1) First Click"CHOOSE FILE" button , 
              (2) Select a JSON file, and press Open 
              (3) Then Click "UPLOAD SELECTED FILE" button
              
            Tech Support Thanks you for your Patience :)`); }
  }
//////////////////////////////////////////////


  //////////////////////////////////////////////
  // CURR JSON SAVE METHOD
  //////////////////////////////////////////////
  function saveJSON(jsonData){

    JsonKeys=[]
    JsonKeys = Object.keys(jsonData[0])//GRAB ALL KEYS SO WE CAN SORT
    sortBy1(JsonKeys);
    sortedJSON=[{}]
    //WE NEED TO CREATE A NEW OBJ OF ALL DATA WITH A FRESH SORT AS IT WASN'T SORTING BEFORE
    //USING ALL THE KEYS WHICH ARE NOW IN A SORTED LIST WE WE GRAB ALL THE VALUES FOR THOSE KEYS AND APPEND IN ORDER
    for(k of JsonKeys )  sortedJSON[0][k]=jsonData[0][k];

    // console.log('this is sortedJSON', sortedJSON)
    resetAllSaveButtons();//RESETS
   ///MAKE OUR FILE 
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(sortedJSON, null, 2)], {
      type: "text/plain"
    }));
  
    a.target ='_blank'
    a.download = `vc_daily_Log_${theDate('include_time')}.json`;// FILE NAME
    a.click(); //HACK TO THIS WE CLICKED TO DOWNLOAD
  } 


function sortBy1( theArray)
{
   let orderBy = 'asc' 
   topRtrnVal =1
   lowerRtrnVal =1
   if( orderBy == 'asc')  topRtrnVal= -1;  else lowerRtrnVal= -1;
    theArray.sort(function(a, b) 
    {   
        item1 =a
        item2 =b
        if (item1 < item2)  return  topRtrnVal;
        if (item1 > item2)  return  lowerRtrnVal;
        return 0;
    });
  } 