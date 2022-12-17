<script setup>
import EmployeeBoardList from '@/layouts/components/EmployeeBoardList.vue';
import { useOrdersStore } from '@/stores/orders';

const ordersStore = useOrdersStore()
const isLoading = ref(true)

onBeforeMount(async () => {
    await ordersStore.fetchBoard().finally(() => isLoading.value = false)
})

const assignOrder = (order) => {
    //TODO: API Request to assign delivery person to order
    ordersStore.assignedOrders.push(order)
    const index = ordersStore.unassignedOrders.indexOf(order)
    if (index > -1) { 
        ordersStore.unassignedOrders.splice(index, 1);
    }
}

const unassignOrder = (order) => {
    //TODO: API Request to unaassign delivery person to order
    ordersStore.unassignedOrders.push(order)

    const index = ordersStore.assignedOrders.indexOf(order)
    if (index > -1) { 
        ordersStore.assignedOrders.splice(index, 1);
    }
}

const getStatusColor = (status) => {
    switch (status) {
        case 'R':
            return 'success'
        case 'P':
            return 'primary'
        default:
            return 'warning'
    }
}
</script>

<template>
    <VCol cols="12">
        <VCard>
            <VRow no-gutters class="align-cards justify-start">
                <EmployeeBoardList :boardTitle="'Waiting'"
                    :tickets="ordersStore.unassignedOrders ? ordersStore.unassignedOrders : []"
                    @assignOrder="assignOrder" />
                <VDivider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" />

                <VCol cols="12" md="7">
                    <VCardTitle class="ma-3">
                        Preparing
                    </VCardTitle>
                    <VRow v-if="ordersStore.assignedOrders.length > 0" class="align-cards justify-start pl-6 pr-6 pb-4">
                        <VCol v-for="order in ordersStore.assignedOrders" cols="6">
                            <VCard class="text-center">
                                <VCardTitle>{{ order.ticket_number }}</VCardTitle>
                                <VDivider />
                                <VCol v-for="item in order.items" class="py-3">
                                    <VCardSubtitle>
                                        {{ item.product.name }}

                                        <VChip class="mr-1 px-1 h-auto" style="font-size: x-small;"
                                            :color="getStatusColor(item.status)">
                                            {{ ordersStore.getStatusString(item.status) }}
                                        </VChip>
                                    </VCardSubtitle>
                                </VCol>
                                <VDivider />
                                <VCardActions class="justify-center pt-3">
                                    <VBtn size="34" color="warning" icon="mdi-close-thick" class="mr-3"
                                        @click="unassignOrder(order)" />
                                    <VBtn size="34" color="success" icon="mdi-check-bold" class="ml-3" />
                                </VCardActions>
                            </VCard>
                        </VCol>
                    </VRow>
                </VCol>
            </VRow>
            <VProgressLinear :active="isLoading" indeterminate />
        </VCard>
    </VCol>
</template>

<style lang="scss">
.align-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
