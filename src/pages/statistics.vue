<script setup>
import StatisticsLifeTime from '@/layouts/components/StatisticsLifeTime.vue';
import StatisticsMostSoldByType from '@/layouts/components/StatisticsMostItemByType.vue';
import StatisticsTop5 from '@/layouts/components/StatisticsTop5.vue';
import { useStatisticsStore } from '@/stores/statistics';
import StatisticsCustomerCard from '@/views/dashboards/analytics/StatisticsCustomerCard.vue';
import StatisticsDayBalanceCard from '@/views/dashboards/analytics/StatisticsDayBalanceCard.vue';
import Chart from 'chart.js/auto';

Chart.defaults.font.family = 'inter, sans-serif, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, "Helvetica Neue", arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
Chart.defaults.font.size = 16;
Chart.defaults.color = "#cfcce5";

const statisticsStore = useStatisticsStore()

const balanceDay = ref([])
const order_with_highest_paid_value = ref([])
const average_paid_value_per_order = ref([])
const isLoading = ref(true)

onBeforeMount(
	async () => {
		await statisticsStore.load()
		balanceDay.value = statisticsStore.getStatisticsBalance()
		order_with_highest_paid_value.value = statisticsStore.getOrderWithHighestPaidValue()
		average_paid_value_per_order.value = statisticsStore.getAveragePaidValuePerOrder()
		isLoading.value = false

		const dataPieChart = {
			labels: [
				'Hot Dish',
				'Cold Dish',
				'Drink',
				'Dessert',
			],
			datasets: [{
				label: '',
				data: [
					statisticsStore.statistics?.all.total_of_orders_by_type[0].delivered,
					statisticsStore.statistics?.all.total_of_orders_by_type[1].delivered,
					statisticsStore.statistics?.all.total_of_orders_by_type[2].delivered,
					statisticsStore.statistics?.all.total_of_orders_by_type[3].delivered
				],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)',
					'rgb(124,252,0)'
				],
				hoverOffset: 4
			}]
		};

		var pieChart = new Chart(document.getElementById('pieChart'), {
			type: 'pie',
			data: dataPieChart,
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Total Orders By Type of Product',
					},
				}
			}
		});

		const dataBarChart = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			datasets: [{
				label: 'Number of users Registered',
				data: [statisticsStore.statistics?.all.new_users_by_month[0].Jan,
				statisticsStore.statistics?.all.new_users_by_month[0].Feb,
				statisticsStore.statistics?.all.new_users_by_month[0].Mar,
				statisticsStore.statistics?.all.new_users_by_month[0].Apr,
				statisticsStore.statistics?.all.new_users_by_month[0].May,
				statisticsStore.statistics?.all.new_users_by_month[0].Jun,
				statisticsStore.statistics?.all.new_users_by_month[0].Jul,
				statisticsStore.statistics?.all.new_users_by_month[0].Aug,
				statisticsStore.statistics?.all.new_users_by_month[0].Sep,
				statisticsStore.statistics?.all.new_users_by_month[0].Oct,
				statisticsStore.statistics?.all.new_users_by_month[0].Nov,
				statisticsStore.statistics?.all.new_users_by_month[0].Dece],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 205, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(201, 203, 207, 0.2)'
				],
				borderColor: [
					'rgb(255, 99, 132)',
					'rgb(255, 159, 64)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 162, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 203, 207)'
				],
				borderWidth: 1
			}]
		};

		var barChart = new Chart(document.getElementById('barChart'), {
			type: 'bar',
			data: dataBarChart,
			options: {
				plugins: {
					title: {
						display: true,
						text: 'New Users By Month This Year'
					}
				}
			}
		});

	})
</script>


<template>
	<VRow class="match-height">
		<VCol cols="12" md="3">
			<StatisticsCustomerCard title="Customers"
				:value="statisticsStore.statistics?.all.total_of_new_customers ?? '..'"
				:lastWeekValue="statisticsStore.statistics?.weekly.total_of_new_customers ?? '..'"
				:isLoading="isLoading" />
		</VCol>
		<VCol cols="12" md="9">
			<StatisticsDayBalanceCard title="Balance of the day" :statistics="balanceDay" :isLoading="isLoading" />
		</VCol>
	</VRow>
	<VRow>
		<VCol cols="12" md="6">
			<StatisticsLifeTime :title="'Most Expensive Order'" :statisticsItems="order_with_highest_paid_value"
				:isLoading="isLoading" />
		</VCol>
		<VCol cols="12" md="6">
			<StatisticsLifeTime :title="'Average Spend per Order'" :statisticsItems="average_paid_value_per_order"
				:isLoading="isLoading" />
		</VCol>
	</VRow>
	<VRow>
		<VCol cols="6" md="4">
			<StatisticsTop5 :title="'Top 5 Employees With Most Deliveries'"
				:statisticsItems="statisticsStore.statistics?.all.employee_with_most_deliveries ?? []"
				:isLoading="isLoading" :statisticType="'Deliveries'" />
		</VCol>

		<VCol cols="6" md="4">
			<StatisticsTop5 :title="'Top 5 Chefs With Most Preparations'"
				:statisticsItems="statisticsStore.statistics?.all.chef_with_most_orders ?? []" :isLoading="isLoading"
				:statisticType="'Preparations'" />
		</VCol>

		<VCol cols="6" md="4">
			<VCard>
				<VCardItem>
					<VCardTitle>Top 5</VCardTitle>
				</VCardItem>

				<VCardText>
					<VListItemTitle class="text-sm font-weight-semibold mb-1">
						TODO!
					</VListItemTitle>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>
	<VCol cols="12" class="px-0">
		<StatisticsMostSoldByType :title="'Best Selling Products by Type'"
			:statisticsItems="statisticsStore.statistics?.all.best_selling_products_by_type ?? []" :isLoading="isLoading" />
	</VCol>
	<VRow>
		<VCol cols="12" md="4">
			<VCard style="height: 100%">
				<VCardText>
					<canvas id="pieChart"></canvas>
				</VCardText>
			</VCard>
		</VCol>
		<VCol cols="12" md="8">
			<VCard>
				<VCardText>
					<canvas id="barChart"></canvas>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>

</template>

