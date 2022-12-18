<script setup>
import Table from "@/layouts/components/Table.vue";
import { useUserStore } from "@/stores/user";
import { getStatus, getStatusColor, TableAction, TableColumn } from '@/utils/utils';

const userStore = useUserStore()

const props = defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
  showId: {
    type: Boolean,
    default: true,
  },
  isTableLoading: {
    type: Boolean,
    default: false,
  },
  tableLength: {
    type: Number,
    default: 1,
  }
})

const emit = defineEmits(["newPage", "viewOrder"]);

const newPage = (page) => {
  emit("newPage", page);
}

const viewClick = (user) => {
  emit("viewOrder", user);
};

const tableColumns = [
  new TableColumn("#", "id", column => userStore.isManager),
  new TableColumn("ticket", "ticket_number"),
  new TableColumn("date", "date"),
  new TableColumn("items", "items.length"),
  new TableColumn("payment", "payment_type"),
  new TableColumn("total", item => `${item.total_price}€`),
  new TableColumn("Status", item => getStatus(item.status), null, true, item => getStatusColor(item.status)),
]

const tableActions = [
  new TableAction("View", "mdi-eye", "tonal", viewClick)
]

</script>

<template>

  <Table :items="props.orders" :loading="props.isTableLoading" :tableLength="props.tableLength" @newPage="newPage"
    :columns="tableColumns" :actions="tableActions" />

</template>

<style lang="scss">
.left {
  display: table-cell;
}

.right {
  display: table-cell;
  vertical-align: middle;
  padding-left: 15px;
}
</style>