<script setup>
import { useUsersStore } from '@/stores/users';
import { computed } from "@vue/reactivity";
import { onUnmounted } from "vue";

const usersStore = useUsersStore()

const order = ref({})

const props = defineProps({
  order: {
    type: Object
  }
})

const dialogTitle = computed(() => `Order #${order.value.id}`)

onMounted(() => {
  if (props.order) {
    order.value = { ...props.order }
  }
})


const emit = defineEmits(["close"]);
onUnmounted(() => {
  emit("close");
})
</script>

<template>
  <VCard :title="dialogTitle">
    <VDivider style="border-width: 2px" />

    <VCardText>
      <div class="v-card-text pl-1 pt-0">
        <h6 class="text-sm font-weight-semibold mb-3">{{ order.customer ? 'Invoice to:' : 'Payment info:' }}</h6>
        <table>
          <tr v-if="order.user">
            <td class="pe-6">Name:</td>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr v-if="order.customer">
            <td class="pe-6">NIF:</td>
            <td>{{ order.customer.nif }}</td>
          </tr>
          <tr>
            <td class="pe-6">Payment Method:</td>
            <td>{{ order.payment_type }}</td>
          </tr>
          <tr>
            <td class="pe-6">Payment Reference:</td>
            <td>{{ order.payment_reference }}</td>
          </tr>
        </table>
      </div>

      <VDivider />

      <VTable fixed-header>
        <thead>
          <tr>
            <th class="text-uppercase">
              Item
            </th>
            <th class="text-uppercase">
              Prepared By
            </th>
            <th class="text-uppercase text-end">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.id">
            <td>{{ item.product ? item.product.name : "N/A" }}</td>
            <td>{{ item.preparated ? item.preparated.name : '' }}</td>
            <td class="text-end">{{ item.price }}€</td>
          </tr>
        </tbody>
      </VTable>

      <VDivider />

      <div class="v-card-text pl-2 pr-3 d-flex justify-space-between flex-column flex-sm-row print-row">
        <div class="d-flex mb-1">
          <h6 class="text-sm font-weight-semibold" v-if="order.delivered">
            Deliverer:&nbsp;
          </h6>
          <span> {{ order.delivered?.name }}</span>
        </div>
        <div>
          <table class="w-100">
            <tr>
              <td class="pe-16">Subtotal:</td>
              <td class="text-end">
                <h6 class="text-sm">{{ order.total_price }}€</h6>
              </td>
            </tr>
            <tr>
              <td class="pe-16">Points Discout:</td>
              <td class="text-end">
                <h6 class="text-sm">{{ order.total_paid_with_points }}€</h6>
              </td>
            </tr>
          </table>
          <hr class="v-divider v-theme--dark mt-4 mb-3" aria-orientation="horizontal" role="separator">
          <table class="w-100">
            <tr>
              <td class="pe-16">Total:</td>
              <td class="text-end">
                <h6 class="text-sm">{{ order.total_paid }}€</h6>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </VCardText>

  </VCard>
</template>