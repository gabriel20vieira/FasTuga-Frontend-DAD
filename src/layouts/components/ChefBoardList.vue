<script setup>
const toast = inject('toast')

const props = defineProps({
    boardTitle: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true
    },
    buttons: {
        type: Array,
        required: true
    },
    detailsButton: {
        type: Function,
        required: false,
        default: null
    }
})

</script>

<template>
    <VCardTitle class="ma-3">
        {{ props.boardTitle }}
    </VCardTitle>

    <VRow class="align-cards justify-start pl-6 pr-6 pb-4">
        <VCol v-for="item in props.items" cols="12" sm="6">
            <VCard class="text-center">
                <VCardTitle>{{ item.identification }}</VCardTitle>
                <VDivider />
                <VCol class="py-3">
                    <VCardSubtitle class="text-h6">
                        {{ item.product.name }}
                    </VCardSubtitle>
                </VCol>
                <VCol class="py-3" v-if="props.detailsButton ?? false">
                    <VBtn size="small" variant="outlined" color="primary" @click="props.detailsButton(item)">
                        Details
                    </VBtn>
                </VCol>
                <VDivider />
                <VCardActions class="justify-center pt-3">
                    <VBtn variant="text" :color="btn.color ?? 'primary'" v-for="btn in props.buttons"
                        @click="btn.action(item)">
                        {{ btn.name }}
                    </VBtn>
                </VCardActions>
            </VCard>
        </VCol>
    </VRow>
</template>

