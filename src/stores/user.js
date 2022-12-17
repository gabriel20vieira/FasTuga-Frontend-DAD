import defaultAvatar from '@/assets/images/avatars/avatar-8.png'
import websockets from '@/utils/websockets'
import { defineStore, skipHydrate } from 'pinia'
import { computed, inject } from 'vue'
import { OrderStatus } from './orders'

export const UserType = {
  CHEF: 'EC',
  DELIVERY: 'ED',
  MANAGER: 'EM',
  CUSTOMER: 'C',
}

export const PaymentTypes = {
  VISA: 'VISA',
  PAYPAL: 'PAYPAL',
  MBWAY: 'MBWAY',
}

export const userTypes = [UserType.CHEF, UserType.DELIVERY, UserType.MANAGER, UserType.CUSTOMER]

export const paymentTypes = [PaymentTypes.MBWAY, PaymentTypes.PAYPAL, PaymentTypes.VISA]

export const useUserStore = defineStore('user', () => {
  const axios = inject('axios')
  const serverBaseUrl = inject('serverBaseUrl')
  const toast = inject('toast')
  const soc = websockets()

  // const user = ref(null)
  // const customer = ref(null)
  // const currentOrders = ref([])
  const user = useLocalStorage('user', { id: -1 })
  const customer = useLocalStorage('customer', { id: -1 })
  const currentOrders = useLocalStorage('current-orders', [])

  const userPhoto = computed(() => {
    if (!user.value?.photo_url) {
      return defaultAvatar
    }
    return serverBaseUrl + '/api/image/' + user.value.photo_url
  })

  const isManager = computed(() => {
    return isType(UserType.MANAGER)
  })

  const isChef = computed(() => {
    return isType(UserType.CHEF)
  })

  const isCustomer = computed(() => {
    return isType(UserType.CUSTOMER)
  })

  const isDelivery = computed(() => {
    return isType(UserType.DELIVERY)
  })

  const isAnonymous = computed(() => {
    return user.value?.id == -1
  })

  const isEmployee = computed(() => {
    return isChef || isManager || isDelivery
  })

  const isLogged = computed(() => {
    return user.value?.id != -1
  })

  const userId = computed(() => {
    return user.value?.id ?? -1
  })

  const customerId = computed(() => {
    return customer.value?.id ?? -1
  })

  function isType(type) {
    return isLogged ? user.value?.type == type : false
  }

  async function updatePassword(password, confirmation, callback = null) {
    if (password && confirmation) {
      if (password == confirmation) {
        axios
          .post('/change-password', {
            password: `${password}`,
            password_confirmation: `${confirmation}`,
          })
          .then(res => {
            toast.success(res.message ?? 'Password changes with success! 🤗')
            if (callback) {
              callback(true)
            }
          })
          .catch(err => {
            toast.error(err.response.data.message)
            callback(false)
          })
      } else {
        toast.error("Passwords don't match. 😮")
      }
    } else {
      toast.error('Write something at least. 😑')
    }
    return null
  }

  async function updateUser(id, userData, callback = null) {
    axios
      .patch(`/users/${id}`, userData)
      .then(res => {
        toast.success(res.data.message)
        user.value = res.data.data
        if (callback) {
          callback(true)
        }
      })
      .catch(err => {
        toast.error(err.response.data.message)
        if (callback) {
          callback(false)
        }
      })
  }

  async function updateCustomer(id, userData, callback = null) {
    axios
      .patch(`/customers/${id}`, userData)
      .then(res => {
        toast.success(res.data.message)
        customer.value = res.data.data.customer
        if (callback) {
          callback(true)
        }
      })
      .catch(err => {
        toast.error(err.response.data.message)
        if (callback) {
          callback(false)
        }
      })
  }

  async function loadUser() {
    try {
      const response = await axios.get('users/me')
      user.value = response.data.data
      customer.value = response.data.data?.customer ?? { id: -1 }
    } catch (error) {
      clearUser()
      throw error
    }
  }

  function clearUser() {
    delete axios.defaults.headers.common.Authorization
    sessionStorage.removeItem('token')
    user.value = { id: -1 }
  }

  async function login(credentials) {
    try {
      const response = await axios.post('login', credentials)
      axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token

      //Remember me
      if (credentials.remember) sessionStorage.setItem('token', response.data.token)
      await loadUser()
      soc.login()
      return true
    } catch (error) {
      clearUser()
      return false
    }
  }

  async function logout() {
    try {
      await axios.post('logout').finally(() => {
        soc.logout()
        clearUser()
      })
      return true
    } catch (error) {
      return false
    }
  }

  async function restoreToken() {
    let storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + storedToken
      if (!user.value) {
        await loadUser()
        soc.login()
      }
      return true
    }
    clearUser()
    return false
  }

  async function checkUserCurrentOrders(order) {
    order = order[0]
    if (order && (isCustomer || isAnonymous)) {
      let found = currentOrders.value.find(elem => elem.id == order.id)
      if (found && order.status == OrderStatus.READY) {
        toast.success(`Order with ticket "${order.ticket_number}" is ready.`)
      }
      if (found && order.status == OrderStatus.DELIVERY) {
        toast.success(`Order with ticket "${order.ticket_number}" was delivered.`)
        let idx = currentOrders.value.indexOf(found)
        currentOrders.value.splice(idx, 1)
      }
    }
  }

  return {
    user: skipHydrate(user),
    customer: skipHydrate(customer),
    currentOrders: skipHydrate(currentOrders),
    checkUserCurrentOrders,
    userId,
    userPhoto,
    customerId,
    login,
    logout,
    restoreToken,
    isType,
    isChef,
    isCustomer,
    isDelivery,
    isManager,
    updatePassword,
    updateUser,
    updateCustomer,
    loadUser,
    isAnonymous,
    isLogged,
    isEmployee,
  }
})
