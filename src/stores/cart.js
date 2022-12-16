import { useUserStore } from '@/stores/user'
import websockets from '@/utils/websockets'
import { defineStore, skipHydrate } from 'pinia'
import { computed, inject } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const axios = inject('axios')
  const userStore = useUserStore()
  const soc = websockets()

  const baseOrder = {
    points_used_to_pay: 0,
    items: [],
    products: [],
    payment: {
      type: '',
      reference: '',
    },
  }

  const total = useLocalStorage('cart-total', 0)
  const order = useLocalStorage('cart', structuredClone(baseOrder))
  // const order = ref(structuredClone(baseOrder))

  var found = false

  function resetCart() {
    order.value = structuredClone(baseOrder)
    total.value = 0
  }

  function fillPayment(type, reference) {
    order.value.payment.type = type
    order.value.payment.reference = reference
  }

  async function makeOrder() {
    order.value.items = []
    order.value.products.forEach(p => {
      for (let i = p.quantity; i > 0; i--) {
        order.value.items.push(p.id)
      }
    })

    const { prds: _, ...data } = order.value

    return await axios
      .post('/orders', data)
      .then(res => {
        let completed = res.data.data
        soc.send('orders-update', completed)
        soc.send('board-update')
        return res
      })
      .finally(() => {
        resetCart()
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
    let discount = (order.value.points_used_to_pay / 10) * 5
    let value = total.value - discount
    value = Math.round(value * 100) / 100
    return value < 0 ? 0 : value
  })

  const totalRound = computed(() => {
    let value = Math.round(total.value * 100) / 100
    return value < 0 ? 0 : value.toFixed(2)
  })

  const accumulatedPoints = computed(() => {
    let value = Math.floor(total.value / 10)
    return value < 0 ? 0 : value
  })

  const hasItems = computed(() => {
    return order.value.products.length > 0
  })

  function add(product) {
    if (product) {
      found = false
      order.value.products.forEach((elem, idx) => {
        if (elem.id == product.id) {
          found = true
          order.value.products[idx].quantity += 1
          return
        }
      })

      if (!found) {
        product.quantity = 1
        order.value.products.push(product)
        found = false
      }
      total.value += parseFloat(product.price)
    }
  }

  function removeOne(product) {
    if (product) {
      order.value.products.forEach((elem, idx) => {
        if (elem.id == product.id) {
          if (elem.quantity > 1) {
            total.value -= parseFloat(elem.price)
            order.value.products[idx].quantity -= 1
          } else {
            remove(product)
          }
          return
        }
      })
    }
  }

  function remove(product) {
    if (product) {
      order.value.products.forEach((elem, idx) => {
        if (elem.id == product.id) {
          total.value -= parseFloat(elem.price) * elem.quantity
          order.value.products.splice(idx, 1)
          return
        }
      })
    }
  }

  function clear() {
    order.value.products = []
    order.value.items = []
  }

  return {
    total: skipHydrate(total),
    order: skipHydrate(order),
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
    hasItems,
    fillPayment,
    removeOne,
    resetCart,
  }
})
