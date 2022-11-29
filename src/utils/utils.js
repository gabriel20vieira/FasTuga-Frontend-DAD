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

export const CHEF = 'EC'
export const DELIVERY = 'ED'
export const MANAGER = 'EM'
export const CUSTOMER = 'C'

export function userRole(role) {
  switch (role) {
    case CHEF:
      return 'Chef'
    case DELIVERY:
      return 'Delivery'
    case MANAGER:
      return 'Manager'
    case CUSTOMER:
      return 'Customer'
    default:
      return 'Employee'
  }
}
