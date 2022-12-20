import defaultAvatar from '@/assets/images/avatars/avatar-8.png'
import { OrderStatus } from '@/stores/orders'
import { CHEF, CUSTOMER, DELIVERY, MANAGER } from '@/utils/utils'
import websockets from '@/utils/websockets'
import Cookies from 'js-cookie'
import { defineStore, skipHydrate } from 'pinia'
import { computed, inject } from 'vue'

const AvailablePaymentTypes = {
  VISA: 'VISA',
  PAYPAL: 'PAYPAL',
  MBWAY: 'MBWAY',
}

export const userTypes = [CHEF, DELIVERY, MANAGER, CUSTOMER]

export const paymentTypes = [AvailablePaymentTypes.MBWAY, AvailablePaymentTypes.PAYPAL, AvailablePaymentTypes.VISA]

export const useUserStore = defineStore('user', () => {
  const axios = inject('axios')
  const serverBaseUrl = inject('serverBaseUrl')
  const toast = inject('toast')
  const soc = websockets()
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
    return isType(MANAGER)
  })

  const isChef = computed(() => {
    return isType(CHEF)
  })

  const isCustomer = computed(() => {
    return isType(CUSTOMER)
  })

  const isDelivery = computed(() => {
    return isType(DELIVERY)
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

  async function updatePassword(password, confirmation) {
    if (password && confirmation) {
      if (password == confirmation) {
        return await axios.post('/change-password', {
          password: `${password}`,
          password_confirmation: `${confirmation}`,
        })
      } else {
        toast.error("Passwords don't match. 😮")
      }
    } else {
      toast.error('Write something at least. 😑')
    }
    return null
  }

  async function updateUser(id, userData) {
    return await axios.patch(`/users/${id}`, userData).then(res => {
      user.value = res.data.data
      soc.send('users-update', user.value)
      return res
    })
  }

  async function updateCustomer(id, customerData) {
    return await axios.patch(`/customers/${id}`, customerData).then(res => {
      customer.value = res.data.data.customer ?? { id: -1 }
      soc.send('customers-update', customer.value)
      return res
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
    Cookies.remove('token')
    user.value = { id: -1 }
    customer.value = { id: -1 }
  }

  function clearCurrentOrders() {
    currentOrders.value = []
  }

  async function removeOutdatedTickets() {
    if (isCustomer || isAnonymous) {
      currentOrders.value.forEach(order => {
        let now = new Date()
        if (order.date != `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`) {
          let idx = currentOrders.value.findIndex(o => o.id == order.id)
          if (idx >= 0) {
            currentOrders.value.splice(idx, 1)
          }
        }
      })
    }
  }

  function setupCurrentOrderTimer() {
    var hours = 0.2
    var now = new Date().getTime()
    var setupTime = Cookies.get('setupTime')
    if (setupTime == null) {
      Cookies.set('setupTime', now)
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        removeOutdatedTickets()
        Cookies.set('setupTime', now)
      }
    }
  }

  async function login(credentials) {
    try {
      const response = await axios.post('login', credentials).catch(err => console.log(err))
      axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token

      //Remember me
      if (credentials.remember) {
        Cookies.set('token', response.data.token)
      }
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
      await axios.post('logout').then(() => {
        soc.logout()
        clearUser()
      })
      return true
    } catch (error) {
      return false
    }
  }

  async function restoreToken() {
    let storedToken = Cookies.get('token')
    if (storedToken) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + storedToken
      await loadUser()
      soc.login()
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
    clearCurrentOrders,
    setupCurrentOrderTimer,
    removeOutdatedTickets,
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
    clearUser,
  }
})
