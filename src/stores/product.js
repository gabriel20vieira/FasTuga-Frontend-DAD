import { inject, ref } from 'vue'

export const ProductType = {
  HOT_DISH: 'hot dish',
  COLD_DISH: 'cold dish',
  DESSERT: 'dessert',
  DRINK: 'drink',
}

export const productType = [
  ProductType.HOT_DISH.toUpperCase(),
  ProductType.COLD_DISH.toUpperCase(),
  ProductType.DRINK.toUpperCase(),
  ProductType.DESSERT.toUpperCase(),
]

export const productType_LC = [ProductType.HOT_DISH, ProductType.COLD_DISH, ProductType.DRINK, ProductType.DESSERT]

export const useProductStore = defineStore('product', () => {
  const axios = inject('axios')

  const products = ref([])
  const productsFiltered = ref([])

  const lastFilter = ref(null)

  async function load() {
    try {
      const params = new URLSearchParams([['size', 9999]])
      const response = await axios.get('products', { params })
      products.value = response.data.data
      productsFiltered.value = filter(lastFilter.type)
    } catch (error) {
      products.value = []
      throw error
    }
  }

  async function filter(type = null) {
    if (isTypeValid(type)) {
      lastFilter.value = type
      productsFiltered.value = products.value.filter(product => product.type == type)
    }
  }

  async function save(product) {
    if (product) {
      if (product?.id) {
        return await axios.patch(`products/${product.id}`, product).finally(() => load())
      } else {
        return await axios.post('products', product).finally(() => load())
      }
    }
  }

  async function destroy(product) {
    if (product && product?.id) {
      return await axios.delete(`products/${product.id}`).finally(() => load())
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

  return { products, productsFiltered, ProductType, load, isTypeValid, filter, productType, save, destroy }
})
