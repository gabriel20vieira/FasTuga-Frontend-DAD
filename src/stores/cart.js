import { useUserStore } from '@/stores/user'
import { computed, inject, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const axios = inject('axios')
  const userStore = useUserStore()

  const total = ref(0)
  const order = ref({
    points_used_to_pay: 0,
    items: [],
    payment: {
      type: '',
      reference: '',
    },
  })

  var found = false

  async function makeOrder() {
    axios
      .post('/api/orders', order.value)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function addUsePoints() {
    if (userStore.user?.customer.points - order.value.points_used_to_pay >= 10) {
      order.value.points_used_to_pay += 10
    }
  }

  function removeUsePoints() {
    if (order.value.points_used_to_pay >= 10) {
      order.value.points_used_to_pay -= 10
    }
  }

  const isUsingPoints = computed(() => {
    return order.value.points_used_to_pay > 0
  })

  const currentUserPoints = computed(() => {
    let value = userStore.user.customer.points - order.value.points_used_to_pay
    return value
  })

  const totalDiscount = computed(() => {
    let value = Math.round(total.value - (order.value.points_used_to_pay / 10) * 5 * 100) / 100
    return value < 0 ? 0 : value
  })

  const totalRound = computed(() => {
    let value = Math.round(total.value * 100) / 100
    return value < 0 ? 0 : value
  })

  const accumulatedPoints = computed(() => {
    let value = Math.floor(total.value / 10)
    return value < 0 ? 0 : value
  })

  function add(product) {
    if (product) {
      found = false
      order.value.items.forEach((elem, idx) => {
        if (elem.id == product.id) {
          found = true
          order.value.items[idx].quantity += 1
          return
        }
      })

      if (!found) {
        product.quantity = 1
        order.value.items.push(product)
        found = false
      }

      total.value += parseFloat(product.price)
    }
  }

  function remove(product) {
    if (product) {
      order.value.items.forEach((elem, idx) => {
        if (elem.id == product.id) {
          total.value -= parseFloat(elem.price) * elem.quantity
          order.value.items.splice(idx, 1)
          return
        }
      })
    }
  }

  function clear() {
    order.value.items = []
  }

  return {
    total,
    order,
    add,
    remove,
    clear,
    addUsePoints,
    removeUsePoints,
    totalDiscount,
    totalRound,
    makeOrder,
    accumulatedPoints,
    currentUserPoints,
    isUsingPoints,
  }
})
