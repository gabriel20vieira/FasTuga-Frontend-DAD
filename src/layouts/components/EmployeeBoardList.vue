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

const hover = ref(null)
const emit = defineEmits(["assignOrder"]);

const assign = (order) => {
    hover.value = null
    emit('assignOrder', order)
}
</script>

<template>
    <VCol cols="12" md="5">
        <VCardTitle class="ma-3">
            {{ props.boardTitle }}
        </VCardTitle>
        <VRow v-if="props.tickets.length > 0" class="align-cards justify-start pl-6 pr-6 pb-4">
            <VCol v-for="(order, index) in props.tickets" cols="4">
                <VCard @click="assign(order)" @mouseover="hover = index" @mouseleave="hover = null"
                    class="text-center pt-1 pb-1" :class="{ 'bg-primary': hover == index }">
                    <VCardTitle>{{ hover == index ? 'ASSIGN' : order.ticket_number }}</VCardTitle>
                </VCard>
            </VCol>
        </VRow>
    </VCol>
</template>

