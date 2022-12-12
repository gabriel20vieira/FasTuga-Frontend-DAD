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
        <VCardTitle class="mb-2">
            {{ props.boardTitle }}
        </VCardTitle>
        <VRow v-if="props.tickets.length > 0" class="align-cards justify-start pl-6 pr-6 pb-4">
            <VCol v-for="i in props.tickets" cols="12" lg="2" sm="4">
                <VCard class="text-center pt-1 pb-1" style="border-width: 2.5px;">
                    {{ i }}
                </VCard>
            </VCol>
        </VRow>
        <VCardText v-else>No orders :(</VCardText>
    </VCol>
</template>