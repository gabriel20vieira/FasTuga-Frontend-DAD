<script setup>
import Table from "@/layouts/components/Table.vue";
import { OrderStatus } from "@/stores/orders";
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

const emit = defineEmits(["newPage", "viewOrder", "cancelOrder"]);

const newPage = (page) => {
  emit("newPage", page);
}

const viewClick = (order) => {
  emit("viewOrder", order);
};

const cancelClick = (order) => {
  emit("cancelOrder", order.id);
};

const tableColumns = [
  new TableColumn({ title: "#", path: "id", condition: column => userStore.isManager }),
  new TableColumn({ title: "ticket", path: "ticket_number" }),
  new TableColumn({ title: "date", path: "date" }),
  new TableColumn({ title: "items", path: "items.length" }),
  new TableColumn({ title: "payment", path: "payment_type" }),
  new TableColumn({
    title: "total",
    path: item => `${item.total_price}€`,
    condition: column => !userStore.isDelivery
  }),
  new TableColumn({
    title: "Status",
    path: item => getStatus(item.status),
    condition: column => !userStore.isDelivery,
    chip: true,
    chipColor: item => getStatusColor(item.status)
  }),
]

const tableActions = [
  new TableAction({
    title: "View",
    icon: "mdi-eye",
    color: "tonal",
    callback: viewClick,
  }),
  new TableAction({
    title: "Cancel",
    icon: "mdi-close",
    color: "tonal",
    callback: cancelClick,
    condition: (item) => userStore.isManager && item?.status != OrderStatus.CANCELLED
  })
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