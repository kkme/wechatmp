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
export { fileReader, readFiles }
