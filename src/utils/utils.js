import defaultAvatar from "@/assets/images/avatars/avatar-2.png";
import defaultPlate from "@/assets/images/defaultPlate.png";
import { inject } from 'vue';

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

export function imageUrl(image) {
  if (!image) {
    return defaultPlate
  }

  const serverBaseUrl = inject('serverBaseUrl')
  return `${serverBaseUrl}/api/image/${image}`
}

export function profilePhotoUrl(image) {
  if (!image) {
    return defaultAvatar
  }
  
  const serverBaseUrl = inject('serverBaseUrl')
  return `${serverBaseUrl}/storage/fotos/${image}`
}

export function newAnalyticsTransactionsItem(title, stats, icon, color) {
  return {
    title: title,
    stats: stats,
    icon: icon,
    color: color,
  }
}

export function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

export class TableColumn {
  constructor(title, path, condition = null, chip = false, chipColor = null) {
    this.title = title
    this.path = path
    this.condition = condition
    this.chip = chip
    this.chipColor = chipColor
  }
}

export class TableAction {
  constructor(title, icon, color, callback = null) {
    this.title = title
    this.icon = icon
    this.color = color
    this.callback = callback
  }
}

export const getStatus = status => {
  switch (status) {
    case 'P':
      return 'Preparing'
    case 'R':
      return 'Ready'
    case 'D':
      return 'Delivered'
    case 'C':
      return 'Cancelled'
    default:
      return 'Unknown'
  }
}

export const getStatusColor = status => {
  switch (status) {
    case 'R':
      return 'primary'
    case 'D':
      return 'success'
    case 'C':
      return 'error'
    default:
      return ''
  }
}
