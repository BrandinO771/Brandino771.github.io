

let sumAdded = false;
let incomeTotalAppended = false;

//////////////////////////////////////////////////////
//>> LABOR TABLE ADD A ROW
//////////////////////////////////////////////////////
function addRowLabor( ...jsonData )
{
  let rowVals = []
  rowVals = jsonData[0]|| []
  let argCheck = []
  argCheck = jsonData || []
  let insertValues = false
  if( argCheck.length > 0 ){insertValues = true}

  for( i = 1; i < 5; i++)
    {
      if ( i == 1 ){ newRow = document.createElement('tr') }
      newCell = document.createElement('td')
      newRow.append(newCell)
      newInput = document.createElement('input')

      if ( i == 1 ) 
      {
        newInput.setAttribute('list','employee_list')
        if ( insertValues ) newInput.value = rowVals.employee_name 
      }
      if ( i == 2 ) 
      {
        if ( insertValues ) newInput.value = rowVals.job_site
      }

      if ( i == 3 ) 
      {
        newInput.type = 'number'
        newInput.value ='.00'
        newInput.className = 'input_hours'
        newInput.placeholder ='.00'
        newInput.min='-100.00'
        if ( insertValues ) newInput.value = rowVals.hours
      }
      if ( i == 4 ) 
      {
        newInput.type ='checkbox'
        newInput.className = 'delete_checks'
      }
      newCell.append(newInput)
    }
  document.getElementById('labor_table').append(newRow)
  }
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
//>> EXPENSES & INCOME  TABLE ADD ROW 
//////////////////////////////////////////////////////
function addRow(tableId, incomeTable, ...args)
  {
  let rowVals = []
  rowVals = args[0]|| []
  let argCheck = []
  argCheck = args || []
  let insertValues = false
  // console.log('this is rowVals ', rowVals, 'args.length', args.length)
  if( argCheck.length > 0 ){insertValues = true}
  // console.log('argCheck.length ', argCheck.length  , 'insertValues=', insertValues )
  // document.getElementById(tableId).innerHTML+=exp_row
  idName= ''
  for ( i = 1; i<7; i++)
      {
        // console.log('i is <', i, 'i>', 'incomeTable is', incomeTable, 'typeof(incomeTable)', typeof(incomeTable))

        if( incomeTable == 'no') 
          {
          if(i==1) idName ='text_input_proj'
          if(i==2) idName ='text_input_desc'
          if(i==3) idName ='expense_amt'
          if(i==4) idName ='pymt_method'
          }
          if( incomeTable == 'yes' ) 
          {
          if(i==1) idName ='text_input_proj1'
          if(i==2) idName ='text_input_desc1'
          if(i==3) idName ='income_amt'
          if(i==4) idName ='pymt_method1'
          }
         //1 = 'co1 1' , proj //text area  2 = 'co1 2' , descr // text area  3 = 'co1 3' , total input // input numbe3r
         // 4 = 'co1 4' , pymt method // input  5 = 'insert last sum row if does not exist' ,
      if ( i < 6)
      {
        if ( i == 1){ newRow = document.createElement('tr') }

        newCell = document.createElement('td')
        newRow.append(newCell)
        newRow.setAttribute('onmouseout', "fixHeights(this)" )
      
        if ( i <=2  || i == 4) //> create text area for 1&2  see notes for 4 below 
            {
              if ( i <=2 ) //text areas
                {
                newInput = document.createElement('textArea')
                if ( insertValues )
                  { 
                    if ( i == 1 ) newInput.value= rowVals.project
                    if ( i == 2 ) newInput.value= rowVals.description
                  }
                }
              
              if( i == 4 ) //Payment Method text area for exp table - input for income table // the payment method section
                {
                  if ( incomeTable == 'no')
                      {
                        // newInput = document.createElement('textArea')
                        newInput = document.createElement('input')
                        newInput.setAttribute('list','expense_pymt_list')
                        if ( insertValues ) newInput.value = rowVals.method
                      } 
                  if ( incomeTable == 'yes')
                    {
                    newInput = document.createElement('input')
                    newInput.setAttribute('list','income_pymt_list')
                    if ( insertValues ) newInput.value = rowVals.method
                    }
                }
              newInput.id = idName
              newInput.className ='inputs'
              newCell.append(newInput)
            }

        if ( i==3) // create amount number input
          {
            newInput = document.createElement('input')
            newInput.id = idName
            newInput.type = 'number'
            newInput.value ='.00'
          if ( insertValues ) newInput.value = rowVals.amount
          if ( incomeTable == 'no' ) newInput.className ='input_expenseAmount'
          if ( incomeTable == 'yes' ) newInput.className ='input_incomeAmount'
          newCell.append(newInput)
          }

          if ( i == 5) 
            {
            newInput = document.createElement('input')
            newInput.type ='checkbox'
            newInput.className = 'delete_checks'
            newCell.append(newInput)
            }
    
          //>>FIRST NON-HEADER ROW ADDED EVER !! <1st visit to this func> --- add row with everything created above as the <<last row of table??
          if ( i == 5 && sumAdded == false && incomeTable == 'no') document.getElementById(tableId).append(newRow)
          if ( i == 5 && incomeTotalAppended == false && incomeTable == 'yes') document.getElementById(tableId).append(newRow)
          
          //<2nd Visit to this funct> , add row with everything created above, <<BUT ADD IT as 2ND to last row ??before the sum row> this is the secod time through
        if ( i == 4 && ( ( sumAdded == true && incomeTable == 'no') ||( incomeTotalAppended == true && incomeTable == 'yes') )  )//> create specific 
            {
            parNode = document.getElementById(tableId)
            lastchildElm = parNode.lastChild
            parNode.insertBefore(newRow, lastchildElm )
            }
      }

      if ( i ==6 && ( ( sumAdded == false && incomeTable == 'no') ||( incomeTotalAppended == false && incomeTable == 'yes') )     ) //>>ADD BOTTOM GRAND TOTAL ROW
        {
        newRow = document.createElement('tr')
        for( x = 0 ; x < 5; x++)
            {
            newCell = document.createElement('td')
            if( x != 2 ) newCell.style.backgroundColor = 'rgb(182, 182, 182)'
            if( x == 2 && incomeTable == 'no' ){ newCell.id = 'expenseGrandTotal';  sumAdded=true;}
            if( x == 2 && incomeTable == 'yes'){ newCell.id = 'incomeGrandTotal'; incomeTotalAppended =true;}
            newRow.append(newCell)
            }
          document.getElementById(tableId).append(newRow)
          // document.getElementById(tableId).insertRow(newRow)

          // console.log('document.getElementById(tableId).getElementsByTagName(tbody)',document.getElementById(tableId).getElementsByTagName('tbody'))
        }
    }
    // console.log('bottom of addRows Function i = <', i, '>', 'incomeTable is', incomeTable, 'typeof(incomeTable)', typeof(incomeTable), 'idName = ', idName, 'sumAdded', sumAdded, 'incomeTotalAppended', incomeTotalAppended  )
  }
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
//AUTOMATICALLY START WITH ROWS IN ALL TABLES
//////////////////////////////////////////////////////
/*
addRow('expenses_table', 'no');//call this once to make initial row
addRow('income_table', 'yes');//call this once to make initial row
addRowLabor();
*/
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
//> DELETE 2ND TO LAST ROW ANY TABLE
//////////////////////////////////////////////////////
function deleteLastRow(tableId, labor)
    {
    
      /* //>> THIS METHOD DELETES JUST THE LAST ROW
    d=document.getElementById(tableId)
    console.log('d.childNodes', d.childNodes )
    console.log('children', d.children)
    rowCt=d.children.length
    if( labor == 'labor') {  rowCt-=1} else { rowCt-=2 }
    console.log('this is the table', d)
    if( rowCt > 0)  d.children[rowCt].remove()
    */

 ////>> THIS METHOD DELETES ONLY SELECTED ROWS 
    allRows =document.getElementById(tableId).getElementsByTagName('tr')
    if ( labor != 'labor' ){
      for ( r = allRows.length-2; r>0;  r-- )//will stop before deleting the header row
        {
          if( allRows[r].children[4].firstChild.checked == true )
            {
              allRows[r].remove()
            }
        }
    }
    if ( labor == 'labor')
      {
        for ( r = allRows.length-1; r>0;  r-- )//will stop before deleting the header row
              {
                if( allRows[r].children[3].firstChild.checked == true )
                  {
                    allRows[r].remove()
                  }
              }
        // console.log('number of rows = <', allRows.length, '>' , 'all rows of table', allRows)
        // console.log(' allRows[0].children', allRows[1].children)
        // console.log(' allRows[1].children[3]', allRows[1].children[3])
        // console.log('  allRows[1].children[3].firstChild', allRows[1].children[3].firstChild)
        // console.log('  allRows[1].children[3].firstChild.checked', allRows[1].children[3].firstChild.checked)
        }
    }
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
//> DELETE ALL ROWS OF SPECIFIC TABLES
//////////////////////////////////////////////////////
function deleteAllRows(tableId)
  {
  resetAllSaveButtons();

    d=document.getElementById(tableId).getElementsByTagName('tr')
    // console.log('number of rows = <', d.length, '>' , 'all rows of table', d)
    rowCt=d.length; i=0;
      if(tableId!='labor_table'){
          i = rowCt-2
          if ( rowCt >=2  ){  while( i > 0) {   d[i].remove();   i-=1;  }   }
      }
      if(tableId =='labor_table'){
          i = rowCt-1
          if ( rowCt > 1  ){  while( i > 0) {   d[i].remove();   i-=1;  }   }
      }
  }

//////////////////////////////////////////////////////
//> FOR LOOP TO DELETE ALL ROWS OF ALL TABLES  CALLS deleteAllRows(tableId)
//////////////////////////////////////////////////////  
function runDeleteAllRows()
  {
    all_table_ids = [ 'expenses_table', 'income_table', 'labor_table']
    for( id of all_table_ids ) deleteAllRows(id)
  }
//////////////////////////////////////////////////////  


/////////////////////////////////////////////////////////////////////
//> COMPUTE TOTAL OF AMOUNT COLUMN  - FOR EXP AND INCOME TABLES
////////////////////////////////////////////////////////////////////
function computeTotal(class_name)
    {
    total = 0.00
    sums=document.getElementsByClassName(class_name)
    for ( s of sums)
          {
          // console.log('this is s for sums', s)
          // console.log('this is s for sums', s.value)
          total+=parseFloat(s.value)
          }
     if ( class_name == 'input_expenseAmount') document.getElementById('expenseGrandTotal').innerHTML = total
     if ( class_name == 'input_incomeAmount' ) document.getElementById('incomeGrandTotal').innerHTML = total
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//> FIX THE ROW HEIGHT OF TABLES WITH TEXT AREA INPUTS 
//>> IF USER INCREASE HEIGHT OF TEXT AREA  THIS AUTOMATICALLY SETS ALL INPUT HEIGHTS ARE SAME AS TEXT INPUT HEIGHT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function fixHeights(par)
  {
    // console.log('hi i am fix the heights function')

    heights = ''
    row = par.children;
    // console.log('this is par', par, 'the kids', par.children)
    // console.log('type of row is', typeof(row))
    if ( typeof(row) != "undefined")
    {
    for( cell of row)
      {
      if ( cell.children[0].id =='text_input_desc'  || cell.children[0].id =='text_input_desc1'   )
        {
          if ( (cell.children[0].style.height).length > 0)
            {
                heights =  cell.children[0].style.height
            }
        }
    }
    for( x of row )
        {
          x.children[0].style.height = heights;
        //  console.log('this height is' , x.children[0].style.height, ' it should be', heights )
        }
  }
}

