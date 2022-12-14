<script setup>
import { useProductStore } from '@/stores/product';
import { imageUrl } from '@/utils/utils';

const productStore = useProductStore()

const products = computed(() => {
  productStore.filter('hot dish')
  // return productStore.productsFiltered
  return []
})

</script>

<template>
  <VRow class="" style="height: 20vh;">
    <VCol class="text-center">
      <h2>FasTuga e alguma imagem</h2>
    </VCol>
  </VRow>
  <VRow>
    <VRow class="align-cards py-8 px-6 w-100 gap-8">
      <VCol v-for="product in products.slice(0, 6)" :key="product.id" cols="12" lg="3" sm="3">
        <VCard class="h-100">
          <VImg cover :aspect-ratio="1.5" :src="imageUrl(product.photo_url)" :lazy-src="imageUrl(product.photo_url)" />
          <VCardItem>
            <VCardTitle>
              {{ product.name }}
            </VCardTitle>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </VRow>
</template>

<style lang="scss">
.align-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>