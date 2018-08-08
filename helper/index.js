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

export { fileReader, readFiles, labelToValue, bdDecrypt, bdEncrypt }
