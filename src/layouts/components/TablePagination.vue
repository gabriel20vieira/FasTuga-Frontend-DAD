<script setup>
const currentPage = ref(1)

const props = defineProps({
    tableLength: {
        type: Number,
        required: true,
    },
    isTableLoading: {
        type: Boolean,
        required: false,
    }
})

const emit = defineEmits(["newPage"]);
const clickNewPage = (page) => {
    emit("newPage", page);
}
</script>

<template>
    <VPagination v-model="currentPage" :length="props.tableLength" :total-visible="7" :disabled="props.isTableLoading"
        @update:model-value="clickNewPage" />
</template>