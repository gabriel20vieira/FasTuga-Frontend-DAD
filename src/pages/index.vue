<script setup>
import { useProductStore } from '@/stores/product';
import { imageUrl } from '@/utils/utils';

const productStore = useProductStore()

const products = computed(() => {
  productStore.filter('hot dish')
  return productStore.productsFiltered
})

</script>

<template>
  <VRow>
    <VRow class="align-cards py-8 px-6 w-100 gap-8">
      <VCol v-for="product in products.slice(0, 6)" :key="product.id" cols="12" lg="3" sm="3">
        <VCard>
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