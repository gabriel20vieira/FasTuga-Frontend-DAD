import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref(null)
  const ordersBoard = ref(null)

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

  return {
    load,
    orders,
    fetchBoard,
    ordersBoard,
  }
})
