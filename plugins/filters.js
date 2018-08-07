import Vue from 'vue'

Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('valueToLabel', function(value, items) {
  if (!value || !items) return ''
  const item = items.find(ele => ele.value === value)
  return item ? item.label : value
})

Vue.filter('monthToCh', function(value) {
  if (!value) return ''
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = value.trim().split(/\D/)
  if (year === +date[0] && month === +date[1]) return '本月'
  if (year !== +date[0]) return +date[0] + '年' + +date[1] + '月'
  else return +date[1] + '月'
})

Vue.filter('formatDistance', function(value) {
  if (!(value > 0)) return '未知'
  if (value > 999) return Math.round((value / 1000) * 100) / 100 + 'km'
  return value + 'm'
})

Vue.filter('formatCreateTime', function(value) {
  // if (!(value > 0)) return '未知'
  // if (value > 999) return Math.round((value / 1000) * 100) / 100 + 'km'
  return value
})

// function (type, day) {
//   try {
//   //月结
//   if(type==GlobalEnumType.WAGE_CLEARING_MONTH.value){
//       return '每月'+day+'日';
//   }
//   //周结
//   else if(type==GlobalEnumType.WAGE_CLEARING_WEEK.value){
//       var week=['','星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
//       return '每周'+week[day];
//   }
//   //日结
//   else if(type==GlobalEnumType.WAGE_CLEARING_DAY.value){
//       return '日结'
//   }
//   }
//   catch(e) {
//       console.error(e);
//       return type+':'+day;
//   }
// },
