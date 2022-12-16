<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const props = defineProps({
    boardTitle: {
        type: String,
        required: true,
    },
    tickets: {
        type: Array,
        required: true,
    }
})


</script>

<template>
    <VCol cols="12" md="6">
        <VCardTitle class="ma-3">
            {{ props.boardTitle }}
        </VCardTitle>
        <VRow v-if="props.tickets.length > 0" class="align-cards justify-start pl-6 pr-6 pb-4">
            <VCol v-for="order in props.tickets" cols="4">
                <VCard :class="[
                    'text-center', 'py-2', 'text-h6',
                    { 'bg-primary': userStore.currentOrders.find((obj) => obj.id == order.id) }
                ]" style="border-width: 2.5px; min-width: fit-content;">
                    {{ order.ticket_number }}
                </VCard>
            </VCol>
        </VRow>
    </VCol>
</template>