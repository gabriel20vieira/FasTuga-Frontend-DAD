<script setup>
import OrderDialog from '@/layouts/components/OrderDialog.vue';
import OrdersTable from '@/layouts/components/OrdersTable.vue';
import { useOrdersStore } from '@/stores/orders';
import { onMounted, ref } from 'vue';

const toast = inject('toast')
const ordersStore = useOrdersStore()

const isTableLoading = ref(true)
const tableLength = ref(1)
const orderBeingViewed = ref({})
const isDialogVisible = ref(false)

const onOk = (response) => {
  isTableLoading.value = false
  tableLength.value = response?.data.meta.last_page || 1;
}

const onError = (error) => {
  isTableLoading.value = false
  toast.error(error.message)
}

onMounted(() => {
  ordersStore.load()
    .then((res) => onOk(res))
    .catch((err) => onError(err))
})

const nextPage = (page) => {
  isTableLoading.value = true
  ordersStore.load(page)
    .then((res) => onOk(res))
    .catch((err) => onError(err))
}

const clickViewOrder = (user) => {
  orderBeingViewed.value = { ...user }
  isDialogVisible.value = true
}
</script>

<template>
  <VCol sm="12" md="12" lg="10" offset-lg="1">
    <VCard cols="12">
      <VCardText class="pt-4 pb-2">
        <VCardTitle class="pa-0 table-header">
          <VCardTitle class="pl-0 pt-1 table-title">Orders</VCardTitle>
        </VCardTitle>
      </VCardText>

      <OrdersTable :orders="ordersStore.orders" :isTableLoading="isTableLoading" :tableLength="tableLength"
        @newPage="nextPage" @viewOrder="clickViewOrder" />
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