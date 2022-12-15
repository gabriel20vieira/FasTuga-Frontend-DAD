<script setup>
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
            <VCol v-for="(order, index) in props.tickets" cols="4">
                <VCard :class="['text-center pt-1 pb-1', { 'bg-primary': index == 0 }]"
                    style="border-width: 2.5px; min-width: fit-content;">
                    {{ order.ticket_number }}
                </VCard>
            </VCol>
        </VRow>
    </VCol>
</template>