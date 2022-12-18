<script setup>
import { imageUrl } from '@/utils/utils';

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
    extra: {
        type: String,
        required: false,
        default: null
    }
})
</script>

<template>
    <VCard>
        <VCardItem>
            <VCardTitle>{{ props.title }}</VCardTitle>
        </VCardItem>

        <VRow class="px-5 pt-3 pb-8">
            <VCol v-for="item in props.statisticsItems" cols="12" lg="3" sm="6">
                <VCard style="border-width: 2.5px" class="h-100e my-0 text-center">
                    <VCardTitle class="text-uppercase">
                        {{ item.type }}
                    </VCardTitle>

                    <VImg cover :aspect-ratio="1.5" :src="imageUrl(item.photo_url)"
                        :lazy-src="imageUrl(item.photo_url)" />

                    <VCardItem>
                        <VCardTitle class="text-primary" v-if="item.product_count || props.extra">
                            {{ item.product_count ?? item[props.extra] ?? '...' }}
                        </VCardTitle>
                        <VCardText class="mx-0 my-0 px-0 py-0 text-nowrap">
                            {{ item.name }}
                        </VCardText>
                    </VCardItem>
                </VCard>
            </VCol>
        </VRow>
        <VProgressLinear indeterminate v-if="props.isLoading" />
    </VCard>
</template>