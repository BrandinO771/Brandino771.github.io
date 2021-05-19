

let unpackUploadedJson =[]
let expenseCategory=[]
let incomeCategory=[]
let laborCategory=[]
let uploadedJSONForReview=[]
let all_categories={ expenses_table: [] , income_table : [], labor_table : []}
let expFiltered=[]
let incomeFiltered=[]
let laborFiltered=[]
let dataHasUploaded= false


// fkey==='inc1' 
//  fkey=='lab2'

let fId ={
    exp1:{
          filter1SearchVal1Id : "exp1SearchVal1",  filter1SearchVal2Id : "exp1SearchVal2",  filter1RangeCompareId : "Exp1FilterRangeCompare",
          filter1Sign1Id      : "exp1Filter1Sign1", filter1Sign2Id      : "exp1Filter1Sign2",  
          filter1categoriesId : "exp1Filter1Categories", checkAddAnotherFilterId :'addAnotherExp1Filter', checkForFilterRange :"checkExp1Range",
          filter1DivShowRangeOpts:"exp1ShowRangeFilters",  filterSortById : 'exp1SortMeth', filterOrdertById : 'exp1OrderBy', addAnotherFilterDivId : 'exp1FilterDiv2',
          filter1NextKey : 'exp2' , currKey : 'exp1', csvButtonId: 'expCSVButtonId'
          },
    exp2:{
        filter1SearchVal1Id : "exp2SearchVal1",  filter1SearchVal2Id : "exp2SearchVal2",  filter1RangeCompareId : "Exp2FilterRangeCompare",
        filter1Sign1Id      : "exp2Filter2Sign1", filter1Sign2Id      : "exp2Filter2Sign2",  
        filter1categoriesId : "exp2Filter2Categories", checkForFilterRange :"checkExp2Range"
         },
    inc1:{
        filter1SearchVal1Id : "inc1SearchVal1",  filter1SearchVal2Id : "inc1SearchVal2",  filter1RangeCompareId : "inc1FilterRangeCompare",
        filter1Sign1Id      : "inc1Filter1Sign1", filter1Sign2Id      : "inc1Filter1Sign2",  
        filter1categoriesId : "inc1Filter1Categories", checkAddAnotherFilterId :'addAnotherinc1Filter', checkForFilterRange :"checkInc1Range",
        filter1DivShowRangeOpts:"inc1ShowRangeFilters",  filterSortById : 'inc1SortMeth', filterOrdertById : 'inc1OrderBy', addAnotherFilterDivId : 'inc1FilterDiv2',
        filter1NextKey : 'inc2' , currKey : 'inc1', csvButtonId: 'incCSVButtonId'
        },  
    inc2:{
        filter1SearchVal1Id : "inc2SearchVal1",  filter1SearchVal2Id : "inc2SearchVal2",  filter1RangeCompareId : "inc2FilterRangeCompare",
        filter1Sign1Id      : "inc2Filter2Sign1", filter1Sign2Id      : "inc2Filter2Sign2",  
        filter1categoriesId : "inc2Filter2Categories", checkForFilterRange :"checkinc2Range"
        },
    lab1:{
        filter1SearchVal1Id : "lab1SearchVal1",  filter1SearchVal2Id : "lab1SearchVal2",  filter1RangeCompareId : "lab1FilterRangeCompare",
        filter1Sign1Id      : "lab1Filter1Sign1", filter1Sign2Id      : "lab1Filter1Sign2",  
        filter1categoriesId : "lab1Filter1Categories", checkAddAnotherFilterId :'addAnotherlab1Filter', checkForFilterRange :"checklab1Range",
        filter1DivShowRangeOpts:"lab1ShowRangeFilters",  filterSortById : 'lab1SortMeth', filterOrdertById : 'lab1OrderBy', addAnotherFilterDivId : 'lab1FilterDiv2',
        filter1NextKey : 'lab2' , currKey : 'lab1', csvButtonId: 'labCSVButtonId'
        },  
    lab2:{
        filter1SearchVal1Id : "lab2SearchVal1",  filter1SearchVal2Id : "lab2SearchVal2",  filter1RangeCompareId : "lab2FilterRangeCompare",
        filter1Sign1Id      : "lab2Filter2Sign1", filter1Sign2Id      : "lab2Filter2Sign2",  
        filter1categoriesId : "lab2Filter2Categories", checkForFilterRange :"checklab2Range"
        },       
    };

let fkey = 'exp1';
let filterHtml =''
let filterHtmlPart0=''
let filterHtmlPart1=''
let filterHtmlPart2=''
let filterHtmlPart3=''


function updateHTMLInjection(fkey)      
{
let keyNum=1;
let theHtmlSelectOptions = ''


if (fkey == 'exp1' || fkey =='exp2' || fkey =='inc1' || fkey =='inc2' ) 
        {
            theHtmlSelectOptions=`
            <option value="amount">Amount</option>
            <option value="date">Date</option>
            <option value="project">Proj Name</option>
            <option value="description">Proj Descrpt</option>
            <option value="method"> PYMT Method</option>
            `   
        }
if (fkey == 'lab1' || fkey =='lab2' ) 
        {
            theHtmlSelectOptions=`
            <option value="employee_name">Employee Name</option>
            <option value="job_site">Job Site</option>
            <option value="hours">Hours</option>
            <option value="date">Date</option>
            `   
        }


filterHtmlPart0 = 
`
    <p class='textClass' style='margin-left : 0px;  margin-top: 5px; '>FILTER ${fkey[fkey.length-1]}</p>
     <p  style='margin-left : 0px; margin-top: 5px;'>  Show info from the:</p>
    <br>
 `   

 filterHtmlPart1 = 
 `    <select  class='filters'  id=${ fId[`${fkey}`].filter1categoriesId } >   
      ${theHtmlSelectOptions}
     </select>
 
    <label> column that </label>
    <select  class='filters' id=${fId[fkey].filter1Sign1Id}>  
        <option value=">"> is GREATER Than</option>
        <option value="<"> is LESS Than </option>
        <option value="=="> is EQUAL to </option>
        <option value="!="> is NOT Equal to</option>
        <option value="includes"> Contains </option>
        <option value="excludes"> Doesn't Contain </option>

    </select>
    <label for=${fId[fkey].filter1SearchVal1Id}> this Value</label>
    <input class='filters'  id=${fId[fkey].filter1SearchVal1Id} type=text style="width: 100px;"></input>  
    <br>
  
    <div id=${fId[fkey].filter1DivShowRangeOpts} style='visibility :hidden; ' >
        <select  class='filters'  id=${fId[fkey].filter1RangeCompareId} style='margin-left :110px'>
            <option value="&&"> AND </option>
            <option value="||"> OR </option>
        </select>

        <select  class='filters'  id=${fId[fkey].filter1Sign2Id}  style="margin-left: 37px;" >
            <option value=">"> is GREATER Than</option>
            <option value="<"> is LESS Than </option>
            <option value="=="> is EQUAL to </option>
            <option value="!="> is NOT Equal to</option>
            <option value="includes"> Contains </option>
            <option value="excludes"> Doesn't Contain </option>
        </select>


        <input class='filters'  id=${fId[fkey].filter1SearchVal2Id} type=text style="width: 100px;"></input>
     </div>
     <label for='checkExpRange'>Add a Second Condition to this Filter</label>
     <input class='filters'  style='height:20px; width:20px;' id=${fId[fkey].checkForFilterRange} value=${fkey} type="checkbox"  onclick="showRangeFilter(this.id, this.value, this.checked);"  > 
     `
filterHtmlPart2=`
    <br>
    <label for='addAnotherExpFilter2'>Add One More Filter </label>
    <input  class='filters' id=${fId[fkey].checkAddAnotherFilterId}    style='height:20px; width:20px;' type='checkbox' onclick="appendNewFilter(this.checked, '${fId[fkey].addAnotherFilterDivId}', '${fId[fkey].filter1NextKey}' )" >
    <br>
    <svg height="2" width="100%"><line x1="0" y1="0" x2="100%" y2="0" style="stroke:rgb(0,0,0);stroke-width:2" /></svg>
    <div class='filters'  id=${fId[fkey].addAnotherFilterDivId}></div>

`
filterHtmlPart3=`
    <br>
    <label> Sort By :</label>
    <select  class='filters'  name="sort_properties" id=${fId[fkey].filterSortById }>   
      ${theHtmlSelectOptions}
    </select>

    <label> Sort Method :</label>
    <select  class='filters'  name="sort_method" id=${fId[fkey].filterOrdertById }>  
        <option value="asc"> Low to High </option>
        <option value="desc"> High to Low </option>
    </select>
    <br>
    <br>
     <div name='divForButtons' style=' padding-left: 20px; padding-right: 20px;'>

    <button class='filterButtons' style='position: relative;  width: 140px; font-size: medium; font-family: Arial; 
            background-color: rgb(128, 178, 243); '
            onclick="getAllFilterOptions( '${fkey}' )" 
            >Get Filtered Data
    </button>

    </div>
`
    keyNum = parseInt(fkey[fkey.length-1])   //>>LOOK AT LAST NUMBER OF OUR KEY IF ITS ONE DO SOMETHING DIFF THEN IF 2 
    if(keyNum ==1 ) filterHtml = filterHtmlPart0 + filterHtmlPart1 + filterHtmlPart2 + filterHtmlPart3
    if(keyNum ==2 ) filterHtml = filterHtmlPart0 + filterHtmlPart1
    // if(keyNum ==1 ) filterHtml = filterHtml+filterHtmlPart2 + filterHtmlPart3
    // if(keyNum ==2 ) filterHtml = filterHtml
}

function updateFileUI(id)
{
    f  =document.getElementById('data_fileSelected_text_ui')
    d  =document.getElementById('fileUpload').value//this is the file name
    fn =document.getElementById('data_fileName_text_ui')
    // console.log('updateFileUI')
    if(id == 'fileUpload')
        {
        f.textContent ='A FILE IS BEING SELECTED' 
        f.style.color ='blue'
        }
    if(id == 'data_fileUploaded_text_ui')
        {
            if( d.value != "No file Chosen")
                {
                f.textContent ='A FILE IS SELECTED ' 
                fl=document.getElementById(id)
                fl.textContent ='THE FILE NAME LOADED IS : '
                fl.style.color ='blue'
                fn.textContent=''
                fn.textContent += d.split('\\')[2] 
                }
        }
}







function upload2() {
    uploadedJSONForReview=[]
      var fileUpload = document.getElementById("fileUpload");
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.json)$/;
      // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

      if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
              var reader = new FileReader();
              reader.onload = function (e){
            //    console.log("parsed json data =", JSON.parse(e.target.result) )
               uploadedJSONForReview = JSON.parse(e.target.result);
               dataHasUploaded =true
               updateFileUI('data_fileUploaded_text_ui')
               unpackJSONIntoCategorys();
              }
              reader.readAsText(fileUpload.files[0]);
            //   console.log('reader is ', reader)
        } else { alert("This browser does not support File Reader."); }
        } else { alert(`<< ERROR >> Please Choose JSON File :
        (1) First Click"CHOOSE FILE" button , 
        (2) Select a JSON file, and press Open 
        (3) Then Click "UPLOAD SELECTED FILE" button
        
        Tech Support Thanks you for your Patience :)`);  }
}


function unpackJSONIntoCategorys()
    {
    // console.log('at top of unpackJSONIntoCategorys()')
    // console.log('uploadedJSONForReview =',uploadedJSONForReview )

    all_table_ids = [ 'expenses_table', 'income_table', 'labor_table']
    temp_exp=[]
    temp_arr =[]
        for( dateKey of Object.keys(uploadedJSONForReview[0]))
            {
                for ( table_name of all_table_ids)
                    {
                    if (typeof(uploadedJSONForReview[0][dateKey][table_name] ) != 'undefined' ) 
                        if(uploadedJSONForReview[0][dateKey][table_name].length>0 )
                            {
                            temp_arr = temp_arr.concat(uploadedJSONForReview[0][dateKey][table_name] )
                            for( obj of temp_arr) obj.date = dateKey
                            }
                    all_categories[table_name] = all_categories[table_name].concat(temp_arr)
                    temp_arr=[]
                    }
            }
            // console.log('all_categories', all_categories)
            makeCategoryTextNumber();
}


function makeCategoryTextNumber()
{
    for( props of Object.keys(all_categories) )
        {
            // console.log('this is props', props)
            for( row of all_categories[props] )
                {   
                    if ( props != 'labor_table')
                        {
                            // console.log('this is row.amount', row.amount)
                        if (row.amount == null )  row.amount =0.00;
                        else row.amount = parseFloat(row.amount);
                        } 

                    if ( props == 'labor_table')
                         {
                        // console.log('this is row.hours', row.hours)
                        if (row.hours == null)  row.hours =0.00;
                        else row.hours = parseFloat(row.hours);
                        }
                    // console.log('this is row', row)
                }
        }
}


function sortBy( theArray, fieldName, orderType)
{
     
   let orderBy = orderType ||'asc' 
   topRtrnVal =1
   lowerRtrnVal =1
   if( orderBy == 'asc')  topRtrnVal= -1;  else lowerRtrnVal= -1;
    theArray.sort(function(a, b) 
    {
        item1 = a[fieldName]  
        item2 = b[fieldName]
        if (item1 < item2)  return  topRtrnVal;
        if (item1 > item2)  return  lowerRtrnVal;
        return 0;
    });
}


function applyFilters( theArray, theOptions, tableId )
{   
    filter1 = theArray
    filter2=[]
    expFiltered=[];    incomeFiltered=[];    laborFiltered=[];
    console.log( 'applyFilters() theArray received ',  theArray)
    console.log('this is the filter options', theOptions)
    orderByMeth = '', sortByVals =''
    let inc = 'includes'; //THIS IS A PLUG FOR INCLUDES WHEN WE RECEIVE EXCLUDES AS THE VALUE 
     ct =1;
    for ( let f of theOptions)
    {
            let v1= f.searchVal1 , v2=f.searchVal2, s1= f.sign1 , s2= f.sign2, compareVal=f.compareOperator; keyVals= f.keyVal;
            // console.log('The Options for Current Array Line Item : ',f)
            // console.log( 'f.rangeSearch <',f.rangeSearch, '> f.key <', f.keyVal,  '> f.sign1 <', f.sign1 , '> f.searchVal1 <', f.searchVal1, '> f.compareOperator =', f.compareOperator )
            // console.log(   ` all search opts : ${keyVals} ${s1}  ${v1} ${compareVal} ${keyVals} ${s2} ${v2}` )
            // console.log(' typeof(v1) =',  typeof(v1), ' typeof(v2) =',  typeof(v2) )

            //>>TRIM TEXT FIELDS 
        if(keyVals.toString() != 'amount') {v2 = v2.trim();  v1 = v1.trim();  } 
        // console.log( 'f.keyVal |', f.keyVal ,'| ,keyVals = ', keyVals, ', this is v1|', v1, '| this is v2 |', v2 ,'|')

        if ( f.rangeSearch == 'false')
            {
                if( f.sign1 == '==')    filter1 = filter1.filter( value => value[f.keyVal] == v1 )
                if( f.sign1 == '>')     filter1 = filter1.filter( value => value[f.keyVal] >  v1 )
                if( f.sign1 == '<')     filter1 = filter1.filter( value => value[f.keyVal] <  v1 )
                if( f.sign1 == '!=')    filter1 = filter1.filter( value => value[f.keyVal] != v1 )
                if( f.sign1 == 'includes') { filter1 = filter1.filter( value => value[f.keyVal].includes( v1 )); } 
                if( f.sign1 == 'excludes') { filter1 = filter1.filter( value => !value[f.keyVal].includes( v1 )); } 
            }

        if ( f.rangeSearch == 'true')  // ALLOW FOR SEARCH FOR VALUES IN OR OUT OF A RANGE 
            {
            if ( keyVals != "amount") //not going to use includes on numbers // below is evey permutation of using includes excludes in a range
                {
                if( sign1 == 'includes'  &&  sign2 == 'includes'  )
                    filter1 =eval( `filter1 = filter1.filter( value => value.${keyVals}.${inc}("${v1}")  ${compareVal}  value.${keyVals}.${inc}("${v2}") )` );

                if( sign1 == 'includes'  &&  sign2 == 'excludes'  )
                    filter1 =eval( `filter1 = filter1.filter( value => value.${keyVals}.${inc}("${v1}")  ${compareVal} !value.${keyVals}.${inc}("${v2}") )` );

                if( sign1 == 'excludes'  &&  sign2 == 'includes'  )
                    filter1 =eval( `filter1 = filter1.filter( value => !value.${keyVals}.${inc}("${v1}") ${compareVal}  value.${keyVals}.${inc}("${v2}") )` );

                if( sign1 == 'excludes'  &&  sign2 == 'excludes'  )
                    filter1 =eval( `filter1 = filter1.filter( value => !value.${keyVals}.${inc}("${v1}") ${compareVal} !value.${keyVals}.${inc}("${v2}") )` );

                if( (sign1 !='excludes' &&  sign1 !='includes' )  &&  sign2 == 'excludes'  )
                    filter1 =eval( `filter1 = filter1.filter( value =>  value.${keyVals} ${s1} ${v1}     ${compareVal} !value.${keyVals}.${inc}("${v2}") )` );
                
                if( (sign1 !='excludes' &&  sign1 !='includes' )  &&  sign2 == 'includes'  )
                    filter1 =eval( `filter1 = filter1.filter( value =>  value.${keyVals} ${s1} ${v1}     ${compareVal}  value.${keyVals}.${s2}("${v2}") )` );

                if( (sign2 !='excludes' &&  sign2 !='includes' )  &&  sign1 == 'excludes'  )
                    filter1 =eval( `filter1 = filter1.filter( value =>  !value.${keyVals}.${inc}("${v1}") ${compareVal} value.${keyVals} ${s2} ("${v2}") )` );

                if( (sign2 !='excludes' &&  sign2 !='includes' )  &&  sign1 == 'includes'  )
                    filter1 =eval( `filter1 = filter1.filter( value =>  value.${keyVals}.${s1}("${v1}")   ${compareVal} value.${keyVals} ${s2} ("${v2}") )` );
                }

            if( sign1 != 'includes' && sign1 != 'excludes'  &&  sign2 != 'includes' && sign2 != 'excludes'   )
                {
                if ( keyVals != "amount"){ filter1 =  eval( `filter1 = filter1.filter( value => value.${keyVals} ${s1}  "${v1}" ${compareVal} value.${keyVals} ${s2}  "${v2}" )` ); }//>>THIS WORKS 
                if ( keyVals == "amount"){ filter1 =  eval( `filter1.filter( value => value.${keyVals} ${s1}   ${v1} ${compareVal} value.${keyVals} ${s2}  ${v2} )` ); }//>>THIS WORKS 
                }
            } 
            if (ct== 1){
                orderByMeth = f.orderBy;
                sortByVals = f.sortByVal;
                }
            ct+=1
        } 
        // console.log('orderByMeth =', orderByMeth , ' sortByVals, ', sortByVals, )
        // console.log('filter1 =', filter1)
         lengthOfFilterArray = filter1.length
         // clearTableRows(tableId)
         toggleCSVDownloadButton(tableId, lengthOfFilterArray)
         filter2=filter2.concat(filter1)
         sortBy(filter2, sortByVals, orderByMeth )
         if( tableId == 'expenses_table')  expFiltered    = expFiltered.concat(filter2)
         if( tableId == 'income_table'  )  incomeFiltered = incomeFiltered.concat(filter2)
         if( tableId == 'labor_table'   )  laborFiltered  = laborFiltered.concat(filter2)
        //  console.log('this is filtered array sorted', filter2)
        makeOneTableWithArray(tableId, filter2)

}


function toggleCSVDownloadButton(tableId , lengthOfArray)
    {
     buttonCSVid = '', buttonClearTableId =''
    if( tableId == 'expenses_table')  { buttonCSVid = 'expCSVButtonId';     buttonClearTableId = 'expClearTableId'; }
    if( tableId == 'income_table'  )  { buttonCSVid = 'incomeCSVButtonId';  buttonClearTableId = 'incomeClearTableId'; }
    if( tableId == 'labor_table'   )  { buttonCSVid = 'laborCSVButtonId';   buttonClearTableId = 'laborClearTableId'; }

       if(lengthOfArray>0)
            {
            document.getElementById(buttonCSVid).style.visibility = 'visible'; 
            document.getElementById(buttonClearTableId).style.visibility = 'visible'; 
            }
       if(lengthOfArray==0)
            {
            b1= document.getElementById(buttonCSVid).style.visibility = 'hidden'; 
            b2= document.getElementById(buttonClearTableId).style.visibility = 'hidden'; 
            }
    }



function getAllFilterOptions(filterKey)
{
    // { rangeSearch : 'false', key : '', sign1 : '', searchVal1 : '', sign2 : '', searchVal2 :  '', compareOperator : ''}
  let ops= []
   loopThisTimes = 1;
   totalLoops = 1
   nextKeyIs =''
    // console.log( document.getElementById( fId[filterKey].checkAddAnotherFilterId  ).checked )
    //>> CHECK IF THE ADD ANOTHER FILTER BOX IS CHECKED IF YES THEN WE NEED TO LOOP THROUGH HERE WITH THE SECOND KEY 
   if( document.getElementById( fId[filterKey].checkAddAnotherFilterId  ).checked == true )
        {
        nextKeyIs =  fId[filterKey].filter1NextKey
        loopThisTimes = 2 ;
        totalLoops = 2 
        }

 while( loopThisTimes > 0 )
    {
    key       = document.getElementById( fId[filterKey].filter1categoriesId ).value
    sign1     = document.getElementById( fId[filterKey].filter1Sign1Id      ).value
    searchVal1= document.getElementById( fId[filterKey].filter1SearchVal1Id ).value
    sign2='',   searchVal2='' ,   compareOperator='' , rangeSearch='false',
    sortByOpt ='', orderBy=''

    if (  document.getElementById( fId[filterKey].checkForFilterRange).checked == true  )
        {
            sign2           = document.getElementById( `${fId[filterKey].filter1Sign2Id}`        ).value
            searchVal2      = document.getElementById( `${fId[filterKey].filter1SearchVal2Id}`   ).value
            compareOperator = document.getElementById( `${fId[filterKey].filter1RangeCompareId}` ).value
            rangeSearch='true'
        }

    //>>WE WANT TO GRAB SORT VALUES ON FIRST PASS ALWAYS AND THEN GRAB THEM ON FIRST PASS IN APPLY FILTERS
    if( (totalLoops == 1 && loopThisTimes == 1) || (totalLoops == 2 && loopThisTimes == 2) )
        {
            sortByOpt   = document.getElementById( `${fId[filterKey].filterSortById}`   ).value
            orderBy     = document.getElementById( `${fId[filterKey].filterOrdertById}` ).value
        }

        ops.push({  rangeSearch : rangeSearch, keyVal : key, sign1 : sign1, searchVal1 : searchVal1,  sign2 : sign2, 
                    searchVal2 :  searchVal2, compareOperator : compareOperator, sortByVal : sortByOpt, orderBy : orderBy 
                })
        // console.log('ops is', ops );
        // console.log('all_categories',all_categories)
        // console.log('all_categories.expenses_table',all_categories.expenses_table)
        
    //>>WE ARE ASSINGING HERE THE NEXT KEY TO ALL IN OUR LIBRARY
    if( loopThisTimes==2 ) filterKey = nextKeyIs
        loopThisTimes-=1;
    }

    if ( filterKey == 'exp1' || filterKey == 'exp2') applyFilters( all_categories.expenses_table, ops, 'expenses_table');
    if ( filterKey == 'inc1' || filterKey == 'inc2') applyFilters( all_categories.income_table, ops, 'income_table');
    if ( filterKey == 'lab1' || filterKey == 'lab2') applyFilters( all_categories.labor_table, ops, 'labor_table');

}


function makeOneTableWithArray(tableId, array)//GET ALL DATA and FILTER DATA BUTTONS CALL THIS FUNC
{
    clearTableRows(tableId)
    // console.log('this is array', array, 'this is typeof', typeof(array))

    if ( typeof(array) == 'string'){  //>>use id to access all categories obj array
        //>> we need to clear out specific filteredArrays so CSV downloader knows we are downloading all DATA from dict
        if(tableId == 'expenses_table') expFiltered=[];
        if(tableId == 'income_table')  incomeFiltered=[];
        if(tableId == 'labor_table')   laborFiltered=[];
        array= all_categories[tableId]
        sortBy(array, 'date', 'asc')
        }

    len = array.length;
    toggleCSVDownloadButton(tableId, len)
    if( dataHasUploaded == false  ){
     alert(`<< ERROR >> -- NO DATA TO DISPLAY --
    (1) NO data has been UPLOADED to this Page ?
    (2) At the Top of the Page, Please click "CHOOSE FILE" Button,
    (3) And then "UPLOAD SELECTED FILE" button

          Tech Support Thanks you for your Patience :)`)
    }     

    if(len>0){
    table=document.getElementById(tableId.toString() )
    for ( rows of array ){
           row = document.createElement('tr')
            for ( key of Object.keys(rows))
                {
                cell = document.createElement('td')
                cell.innerHTML= rows[key]
                row.append(cell)
                }
        table.append(row)
        }
    }
}

function clearTableRows(tableId)
{
    toggleCSVDownloadButton(tableId, 0)
    allRows =document.getElementById(tableId).getElementsByTagName('tr')
    if(allRows.length>0)
        for ( r = allRows.length-1; r>0;  r-- ) allRows[r].remove()  //will stop before deleting the header row
}

function makeOneTable(tableId)
{
    
    for( rowData of all_categories[tableId] )
        {
            row = document.createElement('tr')
            for ( key of Object.keys(rowData))
                {
                cell = document.createElement('td')
                cell.innerHTML= rowData[key]
                row.append(cell)
                }
        table.append(row)
        }
}

function appendNewFilter( checkBoxValue, filterMainDivId , fKeySection )
{
    let insertData =  checkBoxValue || false
    updateHTMLInjection(fKeySection)//>>THIS UPDATES THE KEY IN OUR HTML INJECTION CONTENT
    // console.log('filterMainDivId', filterMainDivId, 'fKeySection', fKeySection)
    // console.log(' checkBoxValue',  checkBoxValue, 'clearData is', insertData)

    if ( insertData==true)
        {
        fkey=fKeySection
        console.log('about to inject data into this key', fkey, fKeySection )
        document.getElementById( filterMainDivId ).style.visibility = 'visible'
        document.getElementById( filterMainDivId ).style.opacity = '1'

        document.getElementById( filterMainDivId ).innerHTML += filterHtml
        // console.log('filterHtml = ', filterHtml)
        }
    else{
        document.getElementById( filterMainDivId ).style.visibility = 'hidden'
        document.getElementById( filterMainDivId ).style.opacity = '0'
         document.getElementById(filterMainDivId ).innerHTML =' '; 
        }
}


function showRangeFilter(checkBoxId, fkey ,checked)
{  
    // console.log( 'checkBoxId', checkBoxId, 'fkey' , fkey ,'checked', checked)
    if ( checked == true )
    document.getElementById(fId[fkey].filter1DivShowRangeOpts).style.visibility = 'visible';
    else
    document.getElementById(fId[fkey].filter1DivShowRangeOpts).style.visibility = 'hidden';
}


function csvDownloadFiltered(fkey) {
    //  https://www.developintelligence.com/blog/2017/04/use-javascript-to-export-your-data-as-csv/
    the_data =[]; tableName =''
    if(fkey=='exp1' || fkey=='exp2'  )//HERE WE CHECK FOR WHICH VERSION OF TABLE WE ARE DOWNLOADING - ALL OR FILTERED
            { 
            the_data = expFiltered;    tableName = 'Expenses'; 
            if(the_data.length==0 && all_categories.expenses_table.length> 0) the_data= the_data.concat(all_categories.expenses_table)
            }
    if(fkey=='inc1' || fkey=='inc2'  )
        { 
            the_data = incomeFiltered;  tableName = 'Income';    
            if(the_data.length==0 && all_categories.income_table.length> 0) the_data= the_data.concat(all_categories.income_table)
        }

    if(fkey=='lab1' || fkey=='lab2'  )
        { 
            the_data = laborFiltered ;  tableName = 'Labor';
            if(the_data.length==0 && all_categories.labor_table.length> 0) the_data= the_data.concat(all_categories.labor_table)     
        }
    

    // console.log('fkey', fkey, 'the_data', the_data)
    // console.log( 'Object.keys(the_data[0])', Object.keys(the_data[0]) ); //makes headers 
    keys = Object.keys(the_data[0]); //makes headers 

  
    result = '';
    result += keys.join(',');
    result += '\n';
  
    the_data.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0)
          result += ',';
        result += item[key];
        ctr++;
      });
      result += '\n';
    });
  
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(result); //encode result as csv
    hiddenElement.target = '_blank';
    hiddenElement.download = `vc_LogsReview_${tableName}_CSV_${theDate('include_time')}.csv`;
    // hiddenElement.download = `vc_dailyLog.csv`;
    hiddenElement.click();
    
  }
  































/*

// filter1 = tArray.filter( value => value.project == 'proj a' && value.amount < '200' )
// filter2 = filter1.filter()
// console.log('filter1 =', filter1)

*/

/*
function  makeOneTable(tableId)//>>CONTAINS CONSOLE LOGS
        {
        table=document.getElementById(tableId.toString() )

        for( rowData of all_categories[tableId] )
            {
              console.log('this is rowData', rowData)
              row = document.createElement('tr')

                for ( key of Object.keys(rowData))
                    {
                    console.log('this is key of obj', key)
                    console.log('this is key of obj[key]', rowData[key])
                    cell = document.createElement('td')
                    cell.innerHTML= rowData[key]
                    row.append(cell)
                    }
           table.append(row)
          }
        }
*/



/*
       
    function MakeAllTables(tableId)
    {
    // console.log('this is table id', tableId, 'this expenseCategory',expenseCategory )
     for ( obj of Object.keys(all_categories))
    {
        console.log('this is obj', obj)
        console.log('is obj == to expense table ' , obj == expenses_table )
        console.log('is  obj.toString() == to expenses_table' ,  obj.toString() == 'expenses_table' )

    if( obj.toString() == 'expenses_table')
        {
        table=document.getElementById(obj.toString())

        for( rowData of all_categories[obj] )
        {
          console.log('this is rowData', rowData)
          row = document.createElement('tr')

            for ( key of Object.keys(rowData))
                {
                console.log('this is key of obj', key)
                console.log('this is key of obj[key]', rowData[key])
                cell = document.createElement('td')
                cell.innerHTML= rowData[key]
                row.append(cell)
                }
       table.append(row)
      }}}
    }
*/






/* //>> UNLOCK THIS ONE FOR ALL CONSOLE LOGS 

function unpackJSONIntoCategorys()
{
  all_table_ids = [ 'expenses_table', 'income_table', 'labor_table']
  temp_exp=[]
  temp_arr =[]
     console.log('this is base json uploadedJSONForReview ',     uploadedJSONForReview )

     for( dateKey of Object.keys(uploadedJSONForReview[0]))
        {
            console.log('-----NEW dateKey-----------')
            console.log('this is keys of uploadedJSONForReview  <', dateKey , ' >')
            console.log('this is uploadedJSONForReview[0][dateKey]', uploadedJSONForReview[0][dateKey])

            for ( table_name of all_table_ids)
                {
                if (typeof(uploadedJSONForReview[0][dateKey][table_name] ) != 'undefined' ) 
                    if(uploadedJSONForReview[0][dateKey][table_name].length>0 )
                        {
                        temp_arr = temp_arr.concat(uploadedJSONForReview[0][dateKey][table_name] )
                        for( obj of temp_arr) obj.date = dateKey
                        }
                  if ( table_name == all_table_ids[0]) expenseCategory=expenseCategory.concat(temp_arr)
                  if ( table_name == all_table_ids[1]) incomeCategory=incomeCategory.concat(temp_arr)
                  if ( table_name == all_table_ids[2]) laborCategory=laborCategory.concat(temp_arr)
                  temp_arr=[]
                }

        console.log('expenseCategory', expenseCategory)
        console.log('incomeCategory', incomeCategory)
        console.log('laborCategory', laborCategory)
        }
}
*/

/* //>>EARY VERSION OF FUNC OBSURD METHODS FOR DRILLING INTO DATA AND WE WANT IT VERY HIGHT LEVEL

function unpackJSONIntoCategorys()
{
  all_table_ids = [ 'expenses_table', 'income_table', 'labor_table']
  temp_exp=[]

     console.log('this is base json uploadedJSONForReview ',     uploadedJSONForReview )

     for( dateKey of Object.keys(uploadedJSONForReview[0]))
        {
            console.log('-----NEW dateKey-----------')
            console.log('this is keys of uploadedJSONForReview  <', dateKey , ' >')

            console.log('this is uploadedJSONForReview[0][dateKey]', uploadedJSONForReview[0][dateKey])

            if (  typeof(uploadedJSONForReview[0][dateKey]['expenses_table'] ) != 'undefined'   )
                    temp_exp=temp_exp.concat(uploadedJSONForReview[0][dateKey]['expenses_table'] )

            temp_exp = uploadedJSONForReview[0][dateKey].filter(row =>  uploadedJSONForReview[0][dateKey][row] == 'expense_table');
            console.log('temp_exp', temp_exp)
            

       for ( data_category of all_table_ids)
            {
            console.log('this is all data in data_category <', data_category, '>', uploadedJSONForReview[0][dateKey][data_category])
            console.log('this is length of data <', uploadedJSONForReview[0][dateKey][data_category].length)
            }
            
            
        for ( categoryKey of  Object.keys(uploadedJSONForReview[0][dateKey]))
            {
                console.log('<><>-----NEW categoryKey----------<><>')
                console.log('this is dateKeys,', categoryKey)

                uploadedJSONForReview[0][dateKey][categoryKey]

            for( data  of uploadedJSONForReview[0][dateKey][categoryKey])
                    {
                        console.log('<>D<>-----NEW  data----------<>D<>')
                        console.log('for category ', categoryKey, 'categoryKey.length ', categoryKey.length, 'this is data', data)
                        // console.log('date', date)
                        tempExp = data.filter( data => data == 'expenses_table')
                        // console.log('tempExp', tempExp)
                    }
                }
}
*/