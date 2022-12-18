<script setup>
import ProductDetailsDialog from '@/layouts/components/ProductDetailsDialog.vue';
import TableVue from '@/layouts/components/Table.vue';
import { useOrderItemStore } from '@/stores/orderitem';
import { useUserStore } from '@/stores/user';
import { TableAction, TableColumn } from '@/utils/utils';
import { ref } from 'vue';

const toast = inject('toast')
const orderItemsStore = useOrderItemStore()
const userStore = useUserStore()

const isTableLoading = ref(true)
const tableLength = ref(1)
const itemBeingViewed = ref({})
const isDialogVisible = ref(false)


const onOk = (response) => {
  isTableLoading.value = false
  tableLength.value = response?.data.meta.last_page || 1;
}

const onError = (error) => {
  isTableLoading.value = false
  toast.error(error.message)
}

onBeforeMount(async () => {
  nextPage()
})

const nextPage = (page = 1) => {
  isTableLoading.value = true
  orderItemsStore.load(page)
    .then((res) => onOk(res))
    .catch((err) => onError(err)).finally(() => {
      isTableLoading.value = false
    })
}

const clickViewOrder = (item) => {
  itemBeingViewed.value = { ...item.product }
  isDialogVisible.value = true
}

const tableColumns = [
  new TableColumn("#", "id"),
  new TableColumn("identification", "identification"),
  // new TableColumn("Status", item => getStatus(item.status), null, true, item => getStatusColor(item.status)),
  new TableColumn("price", item => `${item.price}€`),
  new TableColumn("Name", "product?.name"),
]

const tableActions = [
  new TableAction("View", "mdi-eye", "tonal", clickViewOrder)
]

</script>

<template>
  <VCol sm="12" md="12" lg="10" offset-lg="1">
    <VCard cols="12">
      <VCardText class="pt-4 pb-2">
        <VCardTitle class="pa-0 table-header">
          <VCardTitle class="pl-0 pt-1 table-title">Orders</VCardTitle>
        </VCardTitle>
      </VCardText>

      <TableVue :items="orderItemsStore.items" :columns="tableColumns" :loading="isTableLoading"
        :tableLength="tableLength" @newPage="nextPage" :actions="tableActions" />

    </VCard>
  </VCol>

  <VDialog v-model="isDialogVisible" max-width="625">
    <ProductDetailsDialog :product="itemBeingViewed" @close="isDialogVisible = false" />
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