<script setup>
import { useStatisticsStore } from '@/stores/statistics';
import { useUserStore } from '@/stores/user';
import { newAnalyticsTransactionsItem } from '@/utils/utils';
import AnalyticsAward from '@/views/dashboards/analytics/AnalyticsAward.vue';
import AnalyticsTransactions from '@/views/dashboards/analytics/AnalyticsTransactions.vue';
import { onMounted } from 'vue';

const userStore = useUserStore()
const statisticsStore = useStatisticsStore()

var statistics = ref([])

onMounted(async () => {
	await statisticsStore.load().then(() => {
		statistics.value = [
			newAnalyticsTransactionsItem(
				"Customers",
				statisticsStore.statistics?.daily.total_of_new_customers ?? 0,
				"mdi-account-arrow-up",
				"primary"
			),
			newAnalyticsTransactionsItem(
				"Orders",
				statisticsStore.statistics?.daily.total_of_orders ?? 0,
				"mdi-trending-up",
				"success"
			),
			newAnalyticsTransactionsItem(
				"Orders per 30 min",
				statisticsStore.statistics?.daily.mean_of_orders_by_30_minutes ?? 0,
				"mdi-credit-card-fast",
				"warning"
			),
			newAnalyticsTransactionsItem(
				"Paid per 30 min",
				statisticsStore.statistics?.daily.mean_of_paid_by_30_minutes ?? 0,
				"mdi-currency-eur",
				"info"
			)
		]
	})

})

</script>

<template>
	<VRow class="match-height">
		<VCol cols="12" md="4">
			<AnalyticsAward title="Total of customers"
				:text="statisticsStore.statistics?.all.total_of_new_customers ?? 'Unable to load'"
				:subtext="`New the last week: ${statisticsStore.statistics?.weekly.total_of_new_customers ?? 'Unable to load'}`" />
		</VCol>

		<VCol cols="12" md="8">
			<AnalyticsTransactions text="Retrospective" title="Balance of the day" :statistics="statistics" />
		</VCol>

	</VRow>
</template>
