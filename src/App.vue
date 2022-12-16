<script setup>
import websockets from "@/utils/websockets";

const soc = websockets()

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
