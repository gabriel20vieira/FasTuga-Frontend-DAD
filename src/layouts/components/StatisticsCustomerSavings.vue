<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    statistics: {
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
            <VCardTitle>{{ title }}</VCardTitle>
        </VCardItem>
        <VCardText>
            <VRow>
                <VCol cols="6" sm="4">
                    <div class="d-flex align-center">
                        <div class="me-3">
                            <VAvatar color="info" rounded size="42" class="elevation-1">
                                <VIcon size="24" icon="mdi-currency-eur" />
                            </VAvatar>
                        </div>
                        <div class="d-flex flex-column">
                            <span class="text-caption" style="line-height: normal;">
                                Avg. Paid
                            </span>
                            <span class="text-h6 font-weight-medium">{{
                                    statistics?.mean_of_paid_per_order ?? '...'
                            }}€</span>
                        </div>
                    </div>
                </VCol>
                <VCol cols="6" sm="4">
                    <div class="d-flex align-center">
                        <div class="me-3">
                            <VAvatar color="warning" rounded size="42" class="elevation-1">
                                <VIcon size="24" icon="mdi-star-four-points-outline" />
                            </VAvatar>
                        </div>
                        <div class="d-flex flex-column">
                            <span class="text-caption" style="line-height: normal;">
                                Max Points on Order
                            </span>
                            <span class="text-h6 font-weight-medium">{{
                                    statistics?.most_points_on_order ?? '...'
                            }}</span>
                        </div>
                    </div>
                </VCol>
                <VCol cols="6" sm="4">
                    <div class="d-flex align-center">
                        <div class="me-3">
                            <VAvatar color="success" rounded size="42" class="elevation-1">
                                <VIcon size="24" icon="mdi-piggy-bank-outline" />
                            </VAvatar>
                        </div>
                        <div class="d-flex flex-column">
                            <span class="text-caption" style="line-height: normal;">
                                Biggest Discount
                            </span>
                            <span class="text-h6 font-weight-medium">{{
                                    statistics?.biggest_discount ?? '...'
                            }}€</span>
                        </div>
                    </div>
                </VCol>
            </VRow>
        </VCardText>
        <VProgressLinear v-if="isLoading" indeterminate />
    </VCard>
</template>