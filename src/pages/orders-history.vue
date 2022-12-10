<script setup>
import OrdersTable from '@/layouts/components/OrdersTable.vue';
import { onMounted, ref } from 'vue';
import ConfirmationDialog from '../layouts/components/ConfirmationDialog.vue';

const axios = inject('axios')
const toast = inject('toast')

const orders = ref([])
const isTableLoading = ref(true)
const tableLength = ref(1)

const loadOrders = (page) => {
  isTableLoading.value = true
  axios.get(`orders?page=${page || 1}`).then((response) => {
    orders.value = response.data.data
    isTableLoading.value = false
    tableLength.value = response.data.meta.last_page || 1;
    console.log('TESTE: ', orders.value[0])
  }).catch((error) => {
    console.log(error)
    toast.error(error.message)
  })
}

onMounted(() => {
  loadOrders()
})

const nextPage = (page) => {
  loadOrders(page);
}
</script>

<template>
  <VCol cols="12">
    <VCard cols="12">
      <VCardText class="pt-4 pb-2">
        <VCardTitle class="pa-0 table-header">
          <VCardTitle class="pl-0 pt-1 table-title">Orders</VCardTitle>
        </VCardTitle>
      </VCardText>

      <OrdersTable :orders="orders" :isTableLoading="isTableLoading" :tableLength="tableLength" @newPage="nextPage" />
    </VCard>
  </VCol>

  <ConfirmationDialog ref="confirmDialog" />
</template>

<style scoped>
.table-header {
  display: flex;
}

.table-title {
  flex: auto;
}
</style>