const fileReader = file =>
  new Promise((resolve, reject) => {
    let fr = new FileReader()
    fr.addEventListener('load', () => {
      resolve({ name: file.name, base64: fr.result })
    })
    fr.readAsDataURL(file)
  })

const readFiles = files => {
  let readFileList = Array.from(files).map(file => fileReader(file))
  return Promise.all(readFileList)
}
const labelToValue = (labelOrName, items) => {
  if (!labelOrName || !items) return ''
  const item = items.find(ele => ele.lable === labelOrName || ele.name === labelOrName)
  return item ? item.value : labelOrName
}

// 百度坐标转高德（传入经度、纬度）
const bdDecrypt = (bdLng, bdLat, returnObj) => {
  let X_PI = (Math.PI * 3000.0) / 180.0
  let x = bdLng - 0.0065
  let y = bdLat - 0.006
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
  let ggLng = z * Math.cos(theta)
  let ggLat = z * Math.sin(theta)
  return returnObj ? { lng: ggLng, lat: ggLat } : [ggLng, ggLat]
}
// 高德坐标转百度（传入经度、纬度）
const bdEncrypt = (ggLng, ggLat, returnObj) => {
  let X_PI = (Math.PI * 3000.0) / 180.0
  let x = ggLng
  let y = ggLat
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  let bdLng = z * Math.cos(theta) + 0.0065
  let bdLat = z * Math.sin(theta) + 0.006
  return returnObj ? { lat: bdLat, lng: bdLng } : [bdLng, bdLat]
}
const formatTime = (date, fmt = 'yyyy-MM-dd', appendZero = true) => {
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      if (appendZero) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
      } else {
        fmt = fmt.replace(RegExp.$1, o[k])
      }
    }
  }

  return fmt
}
const addDays = (date, days) => {
  let newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return formatTime(newDate)
}

const addHour = (time, hours) => {
  time = time.split(':')
  let hour = +time[0] + hours
  if (hour > 24) {
    hour -= 24
  } else if (hour < 0) {
    hour += 24
  }
  time[0] = hour < 10 ? '0' + hour : hour
  return time.join(':')
}

const dateGreater = (date1, date2) => (date1.replace(/-/g, '') > date2.replace(/-/g, '') ? date1 : date2)

export { fileReader, readFiles, labelToValue, bdDecrypt, bdEncrypt, formatTime, addDays, addHour, dateGreater }
