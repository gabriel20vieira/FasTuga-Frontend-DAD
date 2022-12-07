<script setup>
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from 'vue';


onBeforeMount(async () => await useUserStore().restoreToken())

</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
    </VLayout>
  </VApp>
</template>
