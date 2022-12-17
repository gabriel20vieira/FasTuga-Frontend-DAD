<script setup>
import EmployeeBoardList from '@/layouts/components/DeliveryBoardList.vue';
import { useOrdersStore } from '@/stores/orders';

const ordersStore = useOrdersStore()
const isLoading = ref(true)

onBeforeMount(async () => {
    await fetchBoard()
})

async function fetchBoard() {
    await ordersStore.fetchBoard().finally(() => isLoading.value = false)
}
</script>

<template>
    <VCol cols="12">
        <VCard>
            <VProgressLinear :active="isLoading" indeterminate />
            <VRow no-gutters class="align-cards justify-start">
                <VCol>
                    <EmployeeBoardList :boardTitle="'Preparing'" :buttonText="'Ready'" :showDishStatus="true"
                        :buttonValidation="true"
                        :tickets="ordersStore.ordersBoard ? ordersStore.ordersBoard.preparing : []"
                        @refreshBoard="fetchBoard" />
                </VCol>

                <VDivider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" />

                <VCol>
                    <EmployeeBoardList :boardTitle="'Ready'" :buttonText="'Delivered'"
                        :tickets="ordersStore.ordersBoard ? ordersStore.ordersBoard.ready : []"
                        @refreshBoard="fetchBoard" />
                </VCol>
            </VRow>

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
