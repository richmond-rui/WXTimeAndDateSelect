function withData(param) {
  return param < 10 ? '0' + param : '' + param;
}
function getLoopArray(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i));
  }
  return array;
}
function getYearLoopArray(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i)+"年");
  }
  return array;
}

function getMonthLoopArray(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i)+"月");
  }
  return array;
}
function getDayLoopArray(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i)+"日");
  }
  return array;
}
function getMonthDay(year, month) {
  var realYear=year.replace("年","");
  var realMonth=month.replace("月","");

  var flag = realYear % 400 == 0 || (realYear % 4 == 0 && realYear % 100 != 0), array = null;

  switch (realMonth) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getDayLoopArray(1, 31)
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      array = getDayLoopArray(1, 30)
      break;
    case '02':
      array = flag ? getDayLoopArray(1, 29) : getDayLoopArray(1, 28)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}
function getNewDateArry() {
  // 当前时间的处理
  var newDate = new Date();
  var year = withData(newDate.getFullYear()),
    mont = withData(newDate.getMonth() + 1),
    date = withData(newDate.getDate()),
    hour = withData(newDate.getHours()),
    minu = withData(newDate.getMinutes()),
    seco = withData(newDate.getSeconds());

  return [year, mont, date, hour, minu, seco];
}
function dateTimePicker(startYear, endYear, date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[], [], [], [], []];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  // 处理联动列表数据
  /*年月日 时分秒*/
  dateTimeArray[0] = getYearLoopArray(start, end);
  dateTimeArray[1] = getMonthLoopArray(1, 12);
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
  dateTimeArray[3] = getLoopArray(0, 23);
  dateTimeArray[4] = getLoopArray(0, 59);

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}

function setDefultTime(dateTimeArray,dateTime,date,time){
  var dates=date.split("-");
  var times=time.split(":");
  dateTimeArray[0].forEach((current,index)=>{
      if(dates[0]===current.replace("年","")){
        dateTime[0]=index;
      }
  });

  dateTimeArray[1].forEach((current,index)=>{
    if(dates[1]===current.replace("月","")){
      dateTime[1]=index;
    }
});

dateTimeArray[2].forEach((current,index)=>{
  if(dates[2]===current.replace("日","")){
    dateTime[2]=index;
  }
});

dateTimeArray[3].forEach((current,index)=>{
  if(times[0]===current){
    dateTime[3]=index;
  }
});

dateTimeArray[4].forEach((current,index)=>{
  if(times[1]===current){
    dateTime[4]=index;
  }
});
}

module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay,
  setDefultTime: setDefultTime
}