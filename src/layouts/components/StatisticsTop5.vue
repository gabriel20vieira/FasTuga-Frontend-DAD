<script setup>
import { profilePhotoUrl } from "@/utils/utils";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    statisticsItems: {
        type: Array,
        required: true
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    statisticType: {
        type: String,
        default: ''
    },
    hasPhotos: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <VCard>
        <VCardItem>
            <VCardTitle>{{ props.title }}</VCardTitle>
        </VCardItem>

        <VCardText>
            <VList class="card-list">
                <VListItem v-for="item in props.statisticsItems">
                    <template #prepend>
                        <div v-if="props.hasPhotos" class="rounded-circle overflow-hidden me-6">
                            <VImg :width="30" :src="profilePhotoUrl(item.photo_url)" class="card-avatar" />
                        </div>
                        <div v-else class="me-3">
                            <VAvatar :color="item.color" variant="tonal" rounded size="40" class="elevation-1">
                                <VIcon size="24" :icon="item.icon" />
                            </VAvatar>
                        </div>
                    </template>

                    <VListItemTitle class="text-sm font-weight-semibold mb-1">
                        {{ item.name }}
                    </VListItemTitle>

                    <template #append>
                        <div>
                            <h4 class="font-weight-semibold text-primary">
                                {{ item.count }}
                            </h4>
                            <span class="text-xs text-medium-emphasis">{{ props.statisticType }}</span>
                        </div>
                    </template>
                </VListItem>
            </VList>
        </VCardText>
        <VProgressLinear indeterminate v-if="props.isLoading" />
    </VCard>
</template>

<style lang="css">
.card-avatar {
    aspect-ratio: 1/1;
    object-fit: cover;
    scale: 1.8;
}
</style>