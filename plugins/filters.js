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
