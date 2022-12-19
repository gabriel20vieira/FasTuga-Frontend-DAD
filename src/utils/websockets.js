import router from '@/router'
import { useOrdersStore } from '@/stores/orders'
import { useProductStore } from '@/stores/product'
import { useUserStore } from '@/stores/user'
import { useUsersStore } from '@/stores/users'
import { inject } from 'vue'

const websockets = () => {
  const socket = inject('socket')
  const toast = inject('toast')

  const productStore = useProductStore()
  const userStore = useUserStore()
  const ordersStore = useOrdersStore()
  const usersStore = useUsersStore()

  const login = () => {
    if (userStore.user && userStore.user?.id) {
      socket.emit('login', userStore.user)
    }
  }

  const logout = () => {
    if (userStore.user && userStore.user?.id) {
      socket.emit('logout', userStore.user)
    }
  }

  const send = (event, ...data) => {
    socket.emit(event, data)
  }

  const events = {
    'products-update': async () => await productStore.load(),
    'orders-update': async (order = null) => {
      if (order[0] && order[0].id && ordersStore.orders) {
        let found = ordersStore.orders.findIndex(o => o.id == order[0].id)
        if (found >= 0) {
          ordersStore.orders[found] = order[0]
        } else {
          ordersStore.orders.unshift(order[0])
        }
      }
    },
    'items-update': async () => await ordersStore.fetchBoard(),
    'users-update': async (user = null) => {
      if (user[0] && user[0].id && usersStore.users) {
        let found = usersStore.users.findIndex(u => u.id == user[0].id)
        if (found >= 0) {
          usersStore.users[found] = user[0]
        } else {
          usersStore.users.unshift(user[0])
        }
      }
    },
    'block-user': async (user = null) => {
      if (user[0] && user[0].id == userStore.userId) {
        toast.error('This account has been blocked.')
        userStore.logout()
        userStore.clearUser()
        router.push({ name: 'index' })
      }
    },
    'users-delete': async (user = null) => {
      if (user[0] && user[0].id == userStore.userId) {
        userStore.logout()
        router.push({ name: 'index' })
      }
    },
    'board-update': async (item = null) => {
      await userStore.checkUserCurrentOrders(item[0])
      await ordersStore.fetchBoard()
    },
  }

  const connectionState = () => {
    if (socket) {
      socket.onAny((event, ...args) => {
        console.log(event)
      })

      socket.io.on('reconnect', attempt => {
        toast.success('You are back online 😌')
        login(userStore.user)
      })

      socket.on('connect', () => {
        // On connection established
        login(userStore.user)
      })

      socket.on('disconnect', () => {
        toast.error('You are disconnected 😮')
      })

      for (const [event, callback] of Object.entries(events)) {
        socket.on(event, (data = null) => {
          callback(data)
        })
      }
    }
  }

  return { connectionState, login, socket, logout, send }
}

export default websockets
