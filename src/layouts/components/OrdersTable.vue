<script setup>
import TablePagination from "../components/TablePagination.vue";

const props = defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
  showId: {
    type: Boolean,
    default: false,
  },
  showEmail: {
    type: Boolean,
    default: true,
  },
  showRole: {
    type: Boolean,
    default: true,
  },
  showPhoto: {
    type: Boolean,
    default: true,
  },
  showEditButton: {
    type: Boolean,
    default: true,
  },
  showDeleteButton: {
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

const emit = defineEmits(["newPage"]);
const clickNewTablePage = (page) => {
  emit("newPage", page);
}

const getStatus = (status) => {
  switch (status) {
    case 'P':
      return 'Preparing'
    case 'R':
      return 'Ready'
    case 'D':
      return 'Delivered'
    case 'C':
      return 'Cancelled'
    default:
      return 'Unknown'
  }
}

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
        <th class="text-uppercase">
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
          Amount
        </th>
        <th class="text-uppercase">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.ticket_number }}</td>
        <td>{{ order.date }}</td>
        <td>{{ order.items.length }}</td>
        <td>{{ order.payment_type }}</td>
        <td>{{ order.total_price }}€</td>
        <td>
          <VChip :color="getStatusColor(order.status)">
            {{ getStatus(order.status) }}
          </VChip>
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