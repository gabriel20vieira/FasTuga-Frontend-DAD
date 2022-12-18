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
    showDetailBtn: {
        type: Boolean,
        required: false
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
                    <VCardSubtitle class="text-subtitle-1" style="white-space: initial;">
                        {{ item.product.name }}
                    </VCardSubtitle>
                </VCol>
                <VCol class="py-3" v-if="props.showDetailBtn ?? false">
                    <VBtn size="small" variant="outlined" color="primary">
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

