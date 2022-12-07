import { inject, ref } from 'vue'

export const ProductType = {
  HOT_DISH: 'hot dish',
  COLD_DISH: 'cold dish',
  DESSERT: 'dessert',
  DRINK: 'drink',
}

export const useProductStore = defineStore('product', () => {
  const axios = inject('axios')

  const products = ref([])
  const productsFiltered = ref([])

  async function loadProducts() {
    try {
      const response = await axios.get('products')
      products.value = response.data.data
      productsFiltered.value = response.data.data
    } catch (error) {
      products.value = null
      throw error
    }
  }

  async function filter(type = null) {
    if (isTypeValid(type)) {
      productsFiltered.value = products.value.filter(product => product.type == type)
    }
  }

  function isTypeValid(type) {
    switch (type) {
      case ProductType.HOT_DISH:
      case ProductType.COLD_DISH:
      case ProductType.DESSERT:
      case ProductType.DRINK:
        return true
      default:
        return false
    }
  }

  return { products, productsFiltered, ProductType, loadProducts, isTypeValid, filter }
})
