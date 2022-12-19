import websockets from '@/utils/websockets'
import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const OrderStatus = {
  READY: 'R',
  PREPARING: 'P',
  CANCELLED: 'C',
  DELIVERED: 'D',
}

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref(null)
  const ordersBoard = ref(null)
  const soc = websockets()

  async function load(page) {
    return await axios
      .get(`orders?page=${page || 1}`)
      .then(res => {
        orders.value = res.data.data
        return res
      })
      .catch(err => {
        throw err
      })
  }

  async function fetchBoard() {
    return await axios
      .get('board')
      .then(res => {
        ordersBoard.value = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }

  async function updateOrderStatus(orderID, newStatus) {
    return await axios.patch(`orders/${orderID}`, { status: newStatus }).then(res => {
      soc.send('board-update', res.data.data)
      soc.send('orders-update', res.data.data)
      return res
    })
  }

  return {
    load,
    orders,
    fetchBoard,
    ordersBoard,
    updateOrderStatus,
  }
})
