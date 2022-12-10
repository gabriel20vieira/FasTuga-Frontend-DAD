import { useUserStore } from '@/stores/user'
import { computed, inject, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const axios = inject('axios')
  const userStore = useUserStore()

  const baseOrder = {
    points_used_to_pay: 0,
    items: [],
    products: [],
    payment: {
      type: '',
      reference: '',
    },
  }

  const loading = ref(false)
  const total = ref(0)
  const order = ref(structuredClone(baseOrder))

  var found = false

  function resetCart() {
    order.value = structuredClone(baseOrder)
    total.value = 0
  }

  function fillPayment(type, reference) {
    order.value.payment.type = type
    order.value.payment.reference = reference
  }

  async function makeOrder(callback) {
    loading.value = true
    order.value.items = []
    order.value.products.forEach(p => {
      for (let i = p.quantity; i > 0; i--) {
        order.value.items.push(p.id)
      }
    })

    const { prds: _, ...data } = order.value

    await axios
      .post('/orders', data)
      .then(res => {
        loading.value = false
        callback(res, null)
        resetCart()
      })
      .catch(err => {
        loading.value = false
        callback(null, err)
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
    return value < 0 ? 0 : value
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
    hasItems,
    loading,
    fillPayment,
    removeOne,
  }
})
