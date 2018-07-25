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
