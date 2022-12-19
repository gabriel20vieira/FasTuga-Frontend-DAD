<script setup>
import StatisticsLifeTime from '@/layouts/components/StatisticsLifeTime.vue';
import StatisticsMostSoldByType from '@/layouts/components/StatisticsMostItemByType.vue';
import StatisticsNewUsersBarChart from '@/layouts/components/StatisticsNewUsersBarChart.vue';
import StatisticsOrdersTypePieChart from '@/layouts/components/StatisticsOrdersTypePieChart.vue';
import StatisticsTop5 from '@/layouts/components/StatisticsTop5.vue';
import { useStatisticsStore } from '@/stores/statistics';
import StatisticsCustomerCard from '@/views/dashboards/analytics/StatisticsCustomerCard.vue';
import StatisticsDayBalanceCard from '@/views/dashboards/analytics/StatisticsDayBalanceCard.vue';

const statisticsStore = useStatisticsStore()
const balanceDay = ref([])
const order_with_highest_paid_value = ref([])
const average_paid_value_per_order = ref([])
const transactionStatistics = ref([])
const isLoading = ref(true)

onBeforeMount(async () => {
	await statisticsStore.load()
	balanceDay.value = statisticsStore.getStatisticsBalance()
	order_with_highest_paid_value.value = statisticsStore.getOrderWithHighestPaidValue()
	average_paid_value_per_order.value = statisticsStore.getAveragePaidValuePerOrder()
	transactionStatistics.value = statisticsStore.getTransactionValue()
	isLoading.value = false
})

onUnmounted(() => {
	statisticsStore.clear()
})

</script>


<template>
	<VRow class="match-height">
		<VCol cols="12" md="3">
			<StatisticsCustomerCard title="Customers" :image="true"
				:value="statisticsStore.statistics?.all?.total_of_new_customers ?? '..'" subtitle="This Week"
				:subvalue="statisticsStore.statistics?.weekly?.total_of_new_customers ?? '..'" :isLoading="isLoading" />
		</VCol>
		<VCol cols="12" md="9">
			<StatisticsDayBalanceCard title="Balance of the day" :statistics="balanceDay" :isLoading="isLoading" />
		</VCol>
	</VRow>
	<VRow class="py-3">
		<VCol cols="12" md="6" class="py-3">
			<StatisticsLifeTime :title="'Most Expensive Order'" :statisticsItems="order_with_highest_paid_value"
				:isLoading="isLoading" />
		</VCol>
		<VCol cols="12" md="6">
			<StatisticsLifeTime :title="'Average Spent per Order'" :statisticsItems="average_paid_value_per_order"
				:isLoading="isLoading" />
		</VCol>
	</VRow>
	<VRow>
		<VCol cols="12" md="4">
			<StatisticsTop5 :title="'Top 5 Deliverers'"
				:statisticsItems="statisticsStore.statistics?.all?.employee_with_most_deliveries ?? []"
				:isLoading="isLoading" :statisticType="'Deliveries'" :hasPhotos="true" />
		</VCol>

		<VCol cols="12" md="4">
			<StatisticsTop5 :title="'Top 5 Chefs'"
				:statisticsItems="statisticsStore.statistics?.all?.chef_with_most_orders ?? []" :isLoading="isLoading"
				:statisticType="'Preparations'" :hasPhotos="true" />
		</VCol>

		<VCol cols="12" md="4">
			<StatisticsTop5 :title="'Transactions'" :statisticsItems="transactionStatistics ?? []"
				:isLoading="isLoading" :hasPhotos="false" />
		</VCol>
	</VRow>
	<VCol cols="12" class="px-0 pt-6">
		<StatisticsMostSoldByType :title="'Best Selling Products by Type'"
			:statisticsItems="statisticsStore.statistics?.all?.best_selling_products_by_type ?? []"
			:isLoading="isLoading" />
	</VCol>
	<VRow class="py-3">
		<VCol cols="12" md="4">
			<StatisticsOrdersTypePieChart :title="'Total Orders by Type of Product'" :isLoading="isLoading" />
		</VCol>
		<VCol cols="12" md="8">
			<StatisticsNewUsersBarChart :isLoading="isLoading" :title="'Number of New Users Registered'" />
		</VCol>
	</VRow>

</template>
