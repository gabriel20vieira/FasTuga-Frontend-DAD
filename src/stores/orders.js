import websockets from '@/utils/websockets'
import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const OrderStatus = {
  WAITING: 'W',
  READY: 'R',
  PREPARING: 'P',
  CANCELLED: 'C',
  DELIVERED: 'D',
}

export const getStatusString = status => {
  switch (status) {
    case OrderStatus.PREPARING:
      return 'Preparing'
    case OrderStatus.READY:
      return 'Ready'
    case OrderStatus.DELIVERED:
      return 'Delivered'
    case OrderStatus.CANCELLED:
      return 'Cancelled'
    case OrderStatus.WAITING:
      return 'Waiting'
    default:
      return 'Unknown'
  }
}

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref(null)
  const ordersBoard = ref(null)
  const soc = websockets(inject)

  async function load(page = 1) {
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
    return await axios.patch(`orders/${orderID}`, { status: newStatus }).finally(() => {
      soc.send('board-update')
    })
  }

  return {
    OrderStatus,
    load,
    orders,
    fetchBoard,
    ordersBoard,
    getStatusString,
    updateOrderStatus,
  }
})
