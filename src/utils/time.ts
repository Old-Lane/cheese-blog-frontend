export const timeago = (time: string) : string => {
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
  const minC = Math.floor(diffValue / minute) ; //计算时间差的分，时，天，周，月
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
}
