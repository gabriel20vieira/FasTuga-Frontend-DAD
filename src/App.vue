<script setup>
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from 'vue';

const userStore = useUserStore()
const productStore = useProductStore()

onBeforeMount(async () => {
  // await userStore.restoreToken()
  await productStore.load()
})

</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
    </VLayout>
  </VApp>
</template>
