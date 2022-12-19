<script setup>
import StatisticsCustomerCard from '@/layouts/components/StatisticsCustomerCard.vue';
import { useStatisticsStore } from '@/stores/statistics';
import { useUserStore } from '@/stores/user';
import StatisticsCustomerSavings from './StatisticsCustomerSavings.vue';
import StatisticsMostItemByType from './StatisticsMostItemByType.vue';

const userStore = useUserStore()
const statisticsStore = useStatisticsStore()
const isLoading = ref(true)

onBeforeMount(() => {
	statisticsStore.load().finally(() => {
		isLoading.value = false
	})
})

onUnmounted(() => {
	statisticsStore.clear()
})

</script>

<template>
	<template v-if="userStore.isChef">
		<VRow class="match-height py-2">
			<VCol cols="12" md="4">
				<StatisticsCustomerCard title="Dishes Cooked" :image="true"
					:value="statisticsStore.statistics?.items_cooked ?? '..'" :isLoading="isLoading" />
			</VCol>

			<VCol cols="12" md="12">
				<StatisticsMostItemByType :title="'Most Cooked'"
					:statisticsItems="statisticsStore.statistics?.most_cooked ?? []" extra="times_cooked"
					:isLoading="isLoading" />
			</VCol>
		</VRow>
	</template>

	<template v-if="userStore.isCustomer">
		<VRow class="match-height py-2">
			<VCol cols="12" sm="6" md="6" lg="2">
				<StatisticsCustomerCard title="My Points" :value="userStore.customer?.points ?? '..'" :image="true"
					:isLoading="isLoading" />
			</VCol>
			<VCol cols="12" sm="6" md="6" lg="2">
				<StatisticsCustomerCard title="Orders" :value="statisticsStore.statistics?.total_of_orders ?? '..'"
					:isLoading="isLoading" />
			</VCol>
			<VCol cols="12" md="12" lg="8">
				<StatisticsCustomerSavings title="Savings" :isLoading="isLoading"
					:statistics="statisticsStore.statistics" />
			</VCol>
		</VRow>
		<VRow class="match-height py-2">
			<VCol cols="12" md="12">
				<StatisticsMostItemByType :title="'Most Requested'"
					:statisticsItems="statisticsStore.statistics?.most_chosen_product_per_type ?? []" extra="price"
					afterExtra="€" :isLoading="isLoading" />
			</VCol>
		</VRow>
	</template>

	<template v-if="userStore.isDelivery">
		<VRow class="match-height py-2">
			<VCol cols="12" md="3">
				<StatisticsCustomerCard title="Orders Delivered"
					:value="statisticsStore.statistics?.orders_delivered ?? '..'" :image="true"
					:isLoading="isLoading" />
			</VCol>
			<VCol cols="12" md="3">
				<StatisticsCustomerCard title="Deliveries Last Hour"
					:value="statisticsStore.statistics?.orders_last_hour ?? '..'" :isLoading="isLoading" />
			</VCol>
		</VRow>
	</template>
</template>
