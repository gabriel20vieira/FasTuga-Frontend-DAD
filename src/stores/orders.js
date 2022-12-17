import websockets from '@/utils/websockets'
import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import { OrderItemStatus } from './orderitem'

export const OrderStatus = {
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
    case OrderItemStatus.WAITING:
      return 'Waiting'
    default:
      return 'Unknown'
  }
}

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref(null)
  const ordersBoard = ref(null)
  const soc = websockets()

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

  async function updateOrderStatus(order, newStatus) {
    return await axios.patch(`orders/${order.id}`, { status: newStatus }).then(res => {
      soc.send('board-update', res.data.data)
      soc.send('orders-update', res.data.data)
      return res
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
