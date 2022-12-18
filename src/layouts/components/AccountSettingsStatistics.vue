<script setup>
import { useStatisticsStore } from '@/stores/statistics';
import { useUserStore } from '@/stores/user';
import StatisticsCustomerCard from '@/views/dashboards/analytics/StatisticsCustomerCard.vue';
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
</script>

<template>
	<template v-if="userStore.isChef">
		<VRow class="match-height">
			<VCol cols="12" md="6">
				<StatisticsCustomerCard title="Items cooked" :image="true"
					:value="statisticsStore.statistics?.items_cooked ?? '..'" :isLoading="isLoading" />
			</VCol>
		</VRow>

		<VRow class="match-height">
			<VCol cols="12" md="12">
				<StatisticsMostItemByType :title="'Most cooked'"
					:statisticsItems="statisticsStore.statistics?.most_cooked ?? []" extra="times_cooked"
					:isLoading="isLoading" />
			</VCol>
		</VRow>
	</template>

	<template v-if="userStore.isCustomer">
		<VRow class="match-height py-2">
			<VCol cols="12" md="4">
				<StatisticsCustomerCard title="Points accumulated" :value="userStore.customer?.points ?? '..'"
					:image="true" :isLoading="isLoading" />
			</VCol>
			<VCol cols="12" md="4">
				<StatisticsCustomerCard title="Total of orders"
					:value="statisticsStore.statistics?.total_of_orders ?? '..'" :isLoading="isLoading" />
			</VCol>
		</VRow>
		<VRow class="match-height py-2">
			<VCol>
				<StatisticsCustomerSavings title="Savings" :isLoading="isLoading"
					:statistics="statisticsStore.statistics" />
			</VCol>
		</VRow>
	</template>

	<template v-if="userStore.isDelivery">
		<VRow class="match-height">
			<VCol cols="12" md="4">
				<StatisticsCustomerCard title="Orders delivered"
					:value="statisticsStore.statistics?.orders_delivered ?? '..'" :image="true"
					:isLoading="isLoading" />
			</VCol>
			<VCol cols="12" md="4">
				<StatisticsCustomerCard title="Delivered last hour"
					:value="statisticsStore.statistics?.orders_last_hour ?? '..'" :isLoading="isLoading" />
			</VCol>
		</VRow>
	</template>
</template>
