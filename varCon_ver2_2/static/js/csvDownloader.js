


function getRowData2(tableId){
  theTableRow=document.getElementById(tableId).getElementsByTagName('td')
  let table_dic = { project : '',  description : '', amount : '' , method : ''}
  let table_dic2= {  employee_name : '',  job_site : '', hours : '' }

  all_table_data=[]
  ct = 1 
  dataInputCt =0
  for( cell of theTableRow )
    {

     if (tableId != 'labor_table')///HERE WE HAVE 5 COLUMNS BUT WE ONLY WANT 4, AND WE DONT WANT THE LAST ROW, THE LAST ROW WILL BE ITERATED BUT HAS NOT CHILDREN SO WILL NOT BE RECORDED
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
                          if ( dataInputCt > 0 )  all_table_data.push(table_dic)//only save row if it contains at least one data input 
                           table_dic ={  project : '',  description : '', amount : '' , method : '' }
                           dataInputCt =0
                       }
           }
       ct +=1
       if(ct==6) ct=1 //exiting reseting
     }
     if ( tableId == 'labor_table')//THERE ARE 4 COLUMNS WE ITERATE THROUGH ALL BUT ONLY WANT 3 OF 4 AND WE ARE SYNCHING OUR COUNT WITH OUT ITERATION
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
             if ( dataInputCt > 0 )   all_table_data.push(table_dic2) //only save row if it contains at least one data input 
             table_dic2 = {  employee_name : '',  job_site : '', hours : '' }
             dataInputCt =0
           }
         // console.log('BOTTOM Labor Table the count = <', ct, '> table_dic2 = ', table_dic2 )
       ct +=1
       if(ct==5) ct=1 //exiting reseting
     }
    }
    //  console.log( 'all_table_data' , all_table_data)
     return all_table_data
}
//////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////
/// DOWNLOAD TABLE TO CSV
//////////////////////////////////////////////////////////////////
function csvDownloader(table_id) {
  //  https://www.developintelligence.com/blog/2017/04/use-javascript-to-export-your-data-as-csv/
  the_data = getRowData2(table_id);
  // data =  the_data
  // if ( the_data.length > 0)
  //       {
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
  hiddenElement.download = `vc_dailyLogCSV${table_id}_${theDate('include_time')}.csv`;
  // hiddenElement.download = `vc_dailyLog.csv`;
  hiddenElement.click();
}
