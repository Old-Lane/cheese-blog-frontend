/* export const timeago = (time: string): string => {
  const data = new Date(time);
  const dateTimeStamp = data.getTime();
  const minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;
  const now = new Date().getTime(); //获取当前时间毫秒
  const diffValue = now - dateTimeStamp; //时间差
  // console.log(time, diffValue, 1);

  let result = "";
  if (diffValue < 0) {
    result = "" + "未来";
  }
  const minC = Math.floor(diffValue / minute); //计算时间差的分，时，天，周，月
  const hourC = Math.floor(diffValue / hour);
  const dayC = Math.floor(diffValue / day);
  const weekC = Math.floor(diffValue / week);
  const monthC = Math.floor(diffValue / month);
  const yearC = Math.floor(diffValue / year);

  if (yearC >= 1) {
    result = " " + yearC + "年前";
  } else if (monthC >= 1 && monthC < 12) {
    result = " " + monthC + "月前";
  } else if (weekC >= 1 && weekC < 5 && dayC > 6 && monthC < 1) {
    result = " " + weekC + "周前";
  } else if (dayC >= 1 && dayC < 7) {
    result = " " + dayC + "天前";
  } else if (hourC >= 1 && hourC < 24) {
    result = " " + hourC + "小时前";
  } else if (minC >= 1 && minC <= 59) {
    result = " " + minC + "分钟前";
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚";
  }

  return result;
};

export const timeFormat = (time: string) => {
  const date = new Date(time);

  const year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds()
  const newTime =
    year + "-" + month + "-" + day
  return newTime;
}; */
// 时间戳转多少分钟之前
export function timeago(dateTimeStamp: string): string {
  // 时间字符串转时间戳
  var timestamp = new Date(dateTimeStamp).getTime();
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = day * 365;
  var now = new Date().getTime();
  var diffValue = now - timestamp;
  var result;
  if (diffValue < 0) {
      return '';
  }
  var yearC = diffValue / year;
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (yearC >= 1) {
      result = "" + parseInt(yearC.toString()) + "年前";
  } else if (monthC >= 1) {
      result = "" + parseInt(monthC.toString()) + "月前";
  } else if (weekC >= 1) {
      result = "" + parseInt(weekC.toString()) + "周前";
  } else if (dayC >= 1) {
      result = "" + parseInt(dayC.toString()) + "天前";
  } else if (hourC >= 1) {
      result = "" + parseInt(hourC.toString()) + "小时前";
  } else if (minC >= 1) {
      result = "" + parseInt(minC.toString()) + "分钟前";
  } else
      result = "刚刚";
  return result;
}

export const timeFormat = (time: string) => {
  const date = new Date(time);

  const year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds()
  const newTime =
    year + "-" + month + "-" + day
  return newTime;
}
