import websockets from '@/utils/websockets'
import { defineStore } from 'pinia'
import { inject } from 'vue'

export const OrderItemStatus = {
  WAITING: 'W',
  PREPARING: 'P',
  READY: 'R',
}

export const useOrderItemStore = defineStore('orderitem', () => {
  const axios = inject('axios')
  const soc = websockets()

  const items = ref([])

  async function load(page = 1) {
    return await axios.get(`orderitems?page=${page}`).then(res => {
      items.value = res.data.data
      return res
    })
  }

  async function set(item, type) {
    return await axios
      .patch(`orderitems/${item.id}`, {
        status: type,
      })
      .then(item => {
        soc.send('items-update', item)
        return item
      })
  }

  return {
    load,
    set,
    items,
  }
})
