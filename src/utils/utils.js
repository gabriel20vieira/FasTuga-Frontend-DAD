export function uploadImage(file) {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    return fileReader
    /*
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') return fileReader.result
    }
    */
  }
}