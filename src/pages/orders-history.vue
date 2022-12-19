<script setup>
import OrderDialog from '@/layouts/components/OrderDialog.vue';
import OrdersTable from '@/layouts/components/OrdersTable.vue';
import { useOrdersStore } from '@/stores/orders';
import { onMounted, ref } from 'vue';
import ConfirmationDialog from '../layouts/components/ConfirmationDialog.vue';

const toast = inject('toast')
const ordersStore = useOrdersStore()

const isTableLoading = ref(true)
const tableLength = ref(1)
const orderBeingViewed = ref({})
const isDialogVisible = ref(false)
const confirmDialog = ref(null)

onMounted(() => {
  nextPage()
})

const nextPage = (page) => {
  isTableLoading.value = true
  ordersStore.load(page)
    .then((res) => tableLength.value = res?.data.meta.last_page || 1)
    .catch((err) => toast.error(err.message))
    .finally(() => isTableLoading.value = false)
}

const clickViewOrder = (user) => {
  orderBeingViewed.value = { ...user }
  isDialogVisible.value = true
}

const clickCancelOrder = async (orderID) => {
  if (await confirmDialog.value.open({ message: "Are you sure you want to cancel this order? The customer will recieve a refund." })) {
    ordersStore.updateOrderStatus(orderID, ordersStore.OrderStatus.CANCELLED).then(() => {
      nextPage()
      toast.success("Order canceled successfully!")
      confirmDialog.value.close()
    }).catch((error) => {
      toast.error(error.response.data.message ? error.response.data.message : error.message)
    })
  }
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
        @newPage="nextPage" @viewOrder="clickViewOrder" @cancelOrder="clickCancelOrder" />
    </VCard>
  </VCol>

  <VDialog v-model="isDialogVisible" max-width="625">
    <OrderDialog :order="orderBeingViewed" @close="isDialogVisible = false" />
  </VDialog>

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