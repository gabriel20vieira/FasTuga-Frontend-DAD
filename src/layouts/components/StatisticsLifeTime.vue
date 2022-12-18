<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    statisticsItems: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <VCard>
        <VCardItem>
            <VCardTitle> {{ props.title }}</VCardTitle>
        </VCardItem>
        <VCardText>
            <VRow>
                <VCol v-for="item in props.statisticsItems" :key="item.title" cols="6" sm="3">
                    <div class="d-flex align-center">
                        <div class="me-3">
                            <VAvatar :color="item.color" rounded size="42" class="elevation-1">
                                <VIcon size="24" :icon="item.icon" />
                            </VAvatar>
                        </div>
                        <div class="d-flex flex-column">
                            <span class="text-caption">
                                {{ item.time }}
                            </span>
                            <span class="text-h6 font-weight-medium">{{ item.value }}</span>
                        </div>
                    </div>
                </VCol>
            </VRow>
        </VCardText>
        <VProgressLinear v-if="props.isLoading" indeterminate />
    </VCard>
</template>