<script setup>
import { useProductStore } from '@/stores/product';
import { useUserStore } from "@/stores/user";
import { imageUrl } from '@/utils/utils';

const productStore = useProductStore()
const userStore = useUserStore()

const imgUrl = new URL('@/assets/images/carousel/food1-upscale.jpg', import.meta.url).href


const products = computed(() => {
  productStore.filter('hot dish')
  return productStore.productsFiltered
})

onBeforeMount(async () => {
  await productStore.load()
})

</script>

<template>
  <VRow class="mb-16">
    <VCol cols="12" sm="12" md="6" lg="5">
      <div style="height:20%;"></div>
      <div class="float-md-center pt-8">
        <h1 class="text-primary font-weight-bold text-uppercase landing-title" >FasTuga</h1>
        <h4 class="text-h4 mt-auto mb-5">Very Fast. Very Tuga.</h4>
        <router-link :to="{ name: 'menu' }" v-if="userStore.isAnonymous || userStore.isCustomer">
          <VBtn color="primary" depressed elevation="3" size="large">
            Order now
          </VBtn>
        </router-link>
      </div>
    </VCol>
    <VCol cols="12" sm="12" md="6" lg="7" >
      <VImg :src="imgUrl" max-height="700" max-width="1000" class="ml-auto" style="margin-right: -125px !important;" />
    </VCol>
  </VRow>

  <h1 class="text-h3 text-center mt-16">Some of our menu items!</h1>
  <VDivider class="my-7" style="border-width: 2px;border-radius: 10px;" />

  <VRow>
    <VRow class="align-cards py-8 px-6 w-100 gap-8">
      <VCol v-for="product in products.slice(0, 6)" :key="product.id" cols="12" lg="3" sm="3">
        <VCard class="h-100">
          <VImg cover :aspect-ratio="1" :src="imageUrl(product.photo_url)" :lazy-src="imageUrl(product.photo_url)" />
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

<style lang="scss" scoped>
.align-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.landing-title {
    font-size: 6rem !important;
    font-weight: 500;
    line-height: 7rem;
  }

@media only screen 
and (max-width : 440px) {
  .landing-title {
    font-size: 4rem !important;
  }
}

@media only screen 
and (max-width : 1380px) and (min-width : 440px){
  .landing-title {
    font-size: 5rem !important;
  }
}
</style>