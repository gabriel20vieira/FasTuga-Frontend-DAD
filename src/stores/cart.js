import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const products = ref([])
  const total = ref(0)

  var found = false

  function add(product) {
    if (product) {
      found = false
      products.value.forEach((elem, idx) => {
        console.log(elem, product)
        if (elem.id == product.id) {
          found = true
          products.value[idx].quantity += 1
          return
        }
      })

      if (!found) {
        product.quantity = 1
        products.value.push(product)
        found = false
      }

      total.value += parseFloat(product.price)
    }
  }

  function remove(product) {
    if (product) {
      products.value.forEach((elem, idx) => {
        if (elem.id == product.id) {
          total.value -= parseFloat(elem.price) * elem.quantity
          products.value.splice(idx, 1)
          return
        }
      })
    }
  }

  function clear() {
    products.value = []
  }

  return { products, add, remove, clear, find, total }
})
