import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref(null)
  const ordersBoard = ref(null)

  const unassignedOrders = ref([])
  const assignedOrders = ref([])

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

        unassignedOrders.value = ordersBoard.value.preparing.filter(order => order.delivered == null)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function getStatusString(status) {
    switch (status) {
      case 'P':
        return 'Preparing'
      case 'R':
        return 'Ready'
      case 'D':
        return 'Delivered'
      case 'C':
        return 'Cancelled'
      case 'W':
        return 'Waiting'
      default:
        return 'Unknown'
    }
  }

  return {
    load,
    orders,
    fetchBoard,
    ordersBoard,
    unassignedOrders,
    assignedOrders,
    getStatusString
  }
})
