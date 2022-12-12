<script setup>
import CustomerBoardList from '@/layouts/components/CustomerBoardList.vue';

</script>

<template>
    <VCol cols="12">
        <VCard>
            <VRow no-gutters class="align-cards pa-3 justify-start">
                <CustomerBoardList :boardTitle="'Preparing'" :tickets="[]" />

                <VDivider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" />

                <CustomerBoardList :boardTitle="'Ready'" :tickets="[]" />
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
