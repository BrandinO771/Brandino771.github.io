//////////////////////////////////////////////
/////////////////////////
// My Get Todays Date Method
//////////////////////////
function theDate(include_time_yes_no) {
  includeTime = include_time_yes_no || '';
  console.log('includeTime.length', includeTime.length);
  am_pm = '';
  x = Date();
  x = x.split(' ');
  console.log('x', x);
  t = x[4].split(':');
  hour = '', min = '';
  hour = t[0], min = t[1];
  if (parseInt(hour) > 12)
    am_pm = 'PM'; else
    am_pm = 'AM';
  if (hour > 12) { hour = (parseInt(hour) - 12).toString(); } //covert from military hour to standard

  // the_time = '_'+ t[0]+'.'+t[1]
  the_time = hour + '.' + min + '_' + am_pm;
  month = '';
  if (x[1] == 'January')
    month = '01';
  if (x[1] == 'Feburary')
    month = '02';
  if (x[1] == 'March')
    month = '03';
  if (x[1] == 'April')
    month = '04';
  if (x[1] == 'May')
    month = '05';
  if (x[1] == 'June')
    month = '06';
  if (x[1] == 'July')
    month = '07';
  if (x[1] == 'August')
    month = '08';
  if (x[1] == 'September')
    month = '09';
  if (x[1] == 'October')
    month = '10';
  if (x[1] == 'November')
    month = '11';
  if (x[1] == 'December')
    month = '12';
  if (x[2].length == 1) { x[2] = '0' + x[2]; } //ensure two digit day


  // x[1] = month , x[2] = day, x[3] =year
  // console.log('x[1]-x[2]-x[3]', x[1]+'-'+x[2] +'-'+x[3])
  if (includeTime.length > 0) { the_date = x[3] + '-' + month + '-' + x[2] + "__" + the_time; }
  else { the_date = x[3] + '-' + month + '-' + x[2]; }

  // the_date = x[3] +'-'+month +'-'+ x[2]
  console.log('the date is ', the_date);
  return the_date;
}
