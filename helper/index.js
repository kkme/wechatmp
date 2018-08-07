const fileReader = file =>
  new Promise((resolve, reject) => {
    var fr = new FileReader()
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
export { fileReader, readFiles, labelToValue }
