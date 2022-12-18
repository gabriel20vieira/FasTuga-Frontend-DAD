<script setup>
import CustomerBoardList from '@/layouts/components/CustomerBoardList.vue';
import { useOrdersStore } from '@/stores/orders';

const ordersStore = useOrdersStore()
const isLoading = ref(true)

onBeforeMount(async () => {
    await ordersStore.fetchBoard().finally(() => isLoading.value = false)
})
</script>

<template>
    <VCol sm="12" md="12" lg="10" offset-lg="1">
        <VCard>
            <VRow no-gutters class="align-cards justify-start">
                <CustomerBoardList :boardTitle="'Preparing'"
                    :tickets="ordersStore.ordersBoard ? ordersStore.ordersBoard.preparing : []" />

                <VDivider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" />

                <CustomerBoardList :boardTitle="'Ready'"
                    :tickets="ordersStore.ordersBoard ? ordersStore.ordersBoard.ready : []" />
            </VRow>
            <VProgressLinear :active="isLoading" indeterminate />
        </VCard>
    </VCol>
</template>

<style lang="scss">
.align-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
