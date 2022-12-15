<script setup>
import websockets from "@/utils/websockets";
import { inject } from 'vue';

const soc = websockets(inject)

onBeforeMount(async () => {
  soc.connectionState()
})

</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
    </VLayout>
  </VApp>
</template>
