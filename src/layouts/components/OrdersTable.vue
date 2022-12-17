<script setup>
import { useOrdersStore } from "@/stores/orders";
import { useUserStore } from "@/stores/user";
import TablePagination from "../components/TablePagination.vue";

const userStore = useUserStore()
const ordersStore = useOrdersStore()

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
const clickNewTablePage = (page) => {
  emit("newPage", page);
}

const viewClick = (user) => {
  emit("viewOrder", user);
};

const getStatusColor = (status) => {
  switch (status) {
    case 'R':
      return 'primary'
    case 'D':
      return 'success'
    case 'C':
      return 'error'
    default:
      return ''
  }
}

</script>

<template>
  <VDivider />
  <VProgressLinear :active="props.isTableLoading" indeterminate />
  <VTable>
    <thead>
      <tr>
        <th v-if="(props.showId && userStore.isManager)" class="text-uppercase">
          #
        </th>
        <th class="text-uppercase">
          Ticket
        </th>
        <th class="text-uppercase">
          Date
        </th>
        <th class="text-uppercase">
          Items
        </th>
        <th class="text-uppercase">
          Payment
        </th>
        <th class="text-uppercase">
          Total
        </th>
        <th class="text-uppercase">
          Status
        </th>
        <th class="text-uppercase" style="text-align-last: center">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td v-if="(props.showId && userStore.isManager)">{{ order.id }}</td>
        <td>{{ order.ticket_number }}</td>
        <td>{{ order.date }}</td>
        <td>{{ order.items.length }}</td>
        <td>{{ order.payment_type }}</td>
        <td>{{ order.total_price }}€</td>
        <td>
          <VChip :color="getStatusColor(order.status)">
            {{ ordersStore.getStatusString(order.status) }}
          </VChip>
        </td>
        <td style="text-align-last: center">
          <VBtn icon variant="text" @click="viewClick(order)" width="30px" height="30px">
            <VIcon icon="mdi-eye" size="18" />
            <VTooltip activator="parent" location="end">
              View
            </VTooltip>
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>
  <VDivider />
  <TablePagination :tableLength="props.tableLength" :isTableLoading="props.isTableLoading"
    @newPage="clickNewTablePage" />
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