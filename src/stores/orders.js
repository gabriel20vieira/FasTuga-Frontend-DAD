import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const axios = inject('axios')

  const orders = ref(null)

  async function load() {
    await axios
      .get('orders')
      .then(res => {
        orders.value = res.data.data
      })
      .catch(err => {
        throw err
      })
  }

  return {
    load,
    orders,
  }
})
