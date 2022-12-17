<script setup>
import { OrderItemStatus, useOrderItemStore } from '@/stores/orderitem';
import { useOrdersStore } from '@/stores/orders';
import { useUserStore } from '@/stores/user';
import { imageUrl } from '@/utils/utils';

const toast = inject('toast')

const userStore = useUserStore()
const ordersStore = useOrdersStore()
const orderItemStore = useOrderItemStore()
const isLoading = ref(true)

const set = async (item, status) => {
    isLoading.value = true
    await orderItemStore.set(item, status)
        .then((res) => {
            // toast.success(res.data.message)
            load()
        }).catch((err) => {
            toast.error(err.response.data.message)
            isLoading.value = false
        })
}

const setPreparing = (item) => {
    return set(item, OrderItemStatus.PREPARING)
}

const setWaiting = (item) => {
    return set(item, OrderItemStatus.WAITING)
}

const setReady = (item) => {
    return set(item, OrderItemStatus.READY)
}

const load = async () => {
    return await ordersStore.fetchBoard().finally(() => isLoading.value = false)
}

onBeforeMount(async () => {
    await load()
})
</script>

<template>
    <VCol cols="12">
        <VCard>
            <VRow no-gutters class="align-cards justify-start">
                <VProgressLinear :active="isLoading" indeterminate />

                <VCol cols="12" md="6">
                    <VCardTitle class="ma-3">
                        Waiting
                    </VCardTitle>
                    <div v-if="ordersStore.ordersBoard?.preparing.length ?? 0 > 0" class="justify-start px-6 pb-4">
                        <div v-for="order in ordersStore.ordersBoard.preparing">
                            <VRow v-for="item in order.items" v-show="item.status == OrderItemStatus.WAITING" cols="12"
                                class="py-5">
                                <VCard :class="['py-2 px-2', 'text-h6', 'w-100']" style="border-width: 2.5px;">
                                    <VRow class="px-4 py-3">
                                        <VCol :cols="userStore.isChef ? 4 : 6">
                                            <VImg :src="imageUrl(item.product.photo_url)"
                                                :lazy-src="imageUrl(item.product.photo_url)" width="90"
                                                :aspect-ratio="(3 / 2)" style="border-radius: 0.3em;" />
                                        </VCol>
                                        <VCol :cols="userStore.isChef ? 4 : 6"
                                            style="display: flex; align-self: center;" class="text-center">
                                            <span>
                                                {{ item.identification }}
                                            </span>
                                        </VCol>
                                        <VCol cols="4" v-if="userStore.isChef"
                                            style="display: flex; align-self: center;">
                                            <VRow>
                                                <VBtn class="w-100 my-1" size="small" color="primary" variant="elevated"
                                                    @click="setPreparing(item)">
                                                    Prepare
                                                </VBtn>
                                            </VRow>
                                        </VCol>
                                    </VRow>
                                </VCard>
                            </VRow>
                        </div>
                    </div>
                </VCol>

                <VDivider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" />

                <VCol cols="12" md="6">
                    <VCardTitle class="ma-3">
                        Preparing
                    </VCardTitle>

                    <div v-if="ordersStore.ordersBoard?.preparing.length ?? 0 > 0" class="justify-start px-6 pb-4">
                        <div v-for="order in ordersStore.ordersBoard.preparing">
                            <VRow v-for="item in order.items" v-show="item.status == OrderItemStatus.PREPARING"
                                cols="12" class="py-5">
                                <VCard :class="['py-2 px-2', 'text-h6', 'w-100']" style="border-width: 2.5px;">
                                    <VRow class="px-4 py-3">
                                        <VCol :cols="userStore.isChef ? 4 : 6">
                                            <VImg :src="imageUrl(item.product.photo_url)"
                                                :lazy-src="imageUrl(item.product.photo_url)" width="90"
                                                :aspect-ratio="(3 / 2)" style="border-radius: 0.3em;" />
                                        </VCol>
                                        <VCol :cols="userStore.isChef ? 4 : 6"
                                            style="display: flex; align-self: center;">
                                            <span>
                                                {{ item.identification }}
                                            </span>
                                        </VCol>
                                        <VCol cols="4" v-if="userStore.isChef"
                                            style="display: flex; align-self: center;">
                                            <VRow>
                                                <VBtn class="w-100 my-1" size="small" color="primary" variant="outlined"
                                                    @click="setWaiting(item)">
                                                    Waiting
                                                </VBtn>
                                                <VBtn class="w-100 my-1" size="small" color="primary" variant="elevated"
                                                    @click="setReady(item)">
                                                    Ready
                                                </VBtn>
                                            </VRow>
                                        </VCol>
                                    </VRow>
                                </VCard>
                            </VRow>
                        </div>
                    </div>
                </VCol>

                <!-- <VDivider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" /> -->

                <!-- <CustomerBoardList :boardTitle="'Ready'"
                    :tickets="ordersStore.ordersBoard ? ordersStore.ordersBoard.ready : []" /> -->
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
