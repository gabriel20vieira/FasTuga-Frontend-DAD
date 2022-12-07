export async function uploadImage(file) {
  return new Promise(function (resolve) {
    const fileReader = new FileReader()
    const { files } = file.target
    if (files && files.length) {
      fileReader.readAsDataURL(files[0])

      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') return resolve(fileReader.result)
      }
    }
  })
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

export function buildUrl(base, parameters = {}) {
  let params = []
  if (Object.entries(parameters).length > 0) {
    for (const [key, value] of Object.entries(parameters)) {
      if (value) {
        params.push(`${key}=${encodeURIComponent(value)}`)
      }
    }
  }
  return base + (params.length > 0 ? '?' + params.join('&') : '')
}
