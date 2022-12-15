import { useProductStore } from '@/stores/product'
import { useUserStore } from '@/stores/user'

const websockets = inject => {
  const socket = inject('socket')
  const toast = inject('toast')

  const productStore = useProductStore()
  const userStore = useUserStore()

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

  const connectionState = () => {
    if (socket) {
      socket.io.on('reconnect', attempt => {
        toast.success('You are back online 😌')
        login(userStore.user)
      })

      socket.on('connect', () => {
        // On connection established
      })

      socket.on('disconnect', () => {
        toast.error('You are disconnected 😮')
      })

      socket.on('products-update', async (product = null) => {
        console.log('Update produtos')
        await productStore.load()
      })
    }
  }

  return { connectionState, login, socket, logout, send }
}

export default websockets
