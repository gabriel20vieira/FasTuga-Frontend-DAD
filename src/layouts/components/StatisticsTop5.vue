<script setup>
import defaultAvatar from "@/assets/images/avatars/avatar-2.png";

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
    },
    statisticType: {
        type: String,
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
                        <div class="rounded-circle overflow-hidden card-avatar-width me-6">
                            <VImg :height="29" :width="28" :src="defaultAvatar" class="card-avatar" />
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