<script setup>
import OrderDialog from '@/layouts/components/OrderDialog.vue';
import OrdersTable from '@/layouts/components/OrdersTable.vue';
import { onMounted, ref } from 'vue';

const axios = inject('axios')
const toast = inject('toast')

const orders = ref([])
const isTableLoading = ref(true)
const tableLength = ref(1)
const orderBeingViewed = ref({})
const isDialogVisible = ref(false)

const loadOrders = (page) => {
  isTableLoading.value = true
  axios.get(`orders?page=${page || 1}`).then((response) => {
    orders.value = response.data.data
    isTableLoading.value = false
    tableLength.value = response.data.meta.last_page || 1;
    console.log('TESTE: ', orders.value[9].delivered.name)
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

const clickViewOrder = (user) => {
  orderBeingViewed.value = { ...user }
  isDialogVisible.value = true
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

      <OrdersTable :orders="orders" :isTableLoading="isTableLoading" :tableLength="tableLength" @newPage="nextPage"
        @viewOrder="clickViewOrder" />
    </VCard>
  </VCol>

  <VDialog v-model="isDialogVisible" max-width="625">
    <OrderDialog :order="orderBeingViewed" @close="isDialogVisible = false" />
  </VDialog>
</template>

<style scoped>
.table-header {
  display: flex;
}

.table-title {
  flex: auto;
}
</style>