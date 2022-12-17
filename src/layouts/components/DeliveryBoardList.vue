<script setup>
import { useOrdersStore } from '@/stores/orders';
const ordersStore = useOrdersStore()

const toast = inject('toast')

const props = defineProps({
    boardTitle: {
        type: String,
        required: true,
    },
    buttonText: {
        type: String,
        required: true,
    },
    showDishStatus: {
        type: Boolean,
        default: false,
    },
    //To avoid searching on all order arrays for the order status (Not needed for ready orders)
    buttonValidation: {
        type: Boolean,
        default: false,
    },
    tickets: {
        type: Array,
        required: true,
    }
})

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

const isOrderReady = (order) => {
    return !order.items.find(item => item.status != ordersStore.OrderStatus.READY)
}

const emit = defineEmits(["refreshBoard"]);
const updateOrderStatus = (order) => {
    const newStatus = props.boardTitle == 'Preparing' ? ordersStore.OrderStatus.READY : ordersStore.OrderStatus.DELIVERED

    ordersStore.updateOrderStatus(order.id, newStatus).then((res) => {
        if (res.request.status == 200)
            toast.success("Order set as " + ordersStore.getStatusString(newStatus))
    }
    ).catch(() => {
        toast.error("Unable to change order status")
    })

    emit("refreshBoard")
}
</script>

<template>
    <VCardTitle class="ma-3">
        {{ props.boardTitle }}
    </VCardTitle>

    <VRow class="align-cards justify-start pl-6 pr-6 pb-4">
        <VCol v-for="order in props.tickets" cols="12" sm="6">
            <VCard class="text-center">
                <VCardTitle>{{ order.ticket_number }}</VCardTitle>
                <VDivider />
                <VCol v-for="item in order.items" class="py-3">
                    <VCardSubtitle>
                        {{ item.product.name }}

                        <VChip v-if="props.showDishStatus" class="mr-1 px-1 h-auto" style="font-size: x-small;"
                            :color="getStatusColor(item.status)">
                            {{ ordersStore.getStatusString(item.status) }}
                        </VChip>
                    </VCardSubtitle>
                </VCol>
                <VDivider />
                <VCardActions class="justify-center pt-3">
                    <VBtn :disabled="buttonValidation ? !isOrderReady(order) : false" variant="text" color="primary"
                        @click="updateOrderStatus(order)">
                        {{ props.buttonText }}
                    </VBtn>
                </VCardActions>
            </VCard>
        </VCol>
    </VRow>
</template>

