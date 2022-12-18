<script setup>
import { useStatisticsStore } from '@/stores/statistics';
import { imageUrl } from '@/utils/utils';
import AnalyticsAward from '@/views/dashboards/analytics/AnalyticsAward.vue';
import AnalyticsTransactions from '@/views/dashboards/analytics/AnalyticsTransactions.vue';
import Chart from 'chart.js/auto';

Chart.defaults.font.family = 'inter, sans-serif, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, "Helvetica Neue", arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
Chart.defaults.font.size = 16;
Chart.defaults.color = "#cfcce5";

const statisticsStore = useStatisticsStore()

var statistics = ref([])
var order_with_highest_paid_value = ref([])
var average_paid_value_per_order = ref([])

onBeforeMount(
	async () => {
		await statisticsStore.load()
		statistics.value = statisticsStore.getStatisticsBalance()
		order_with_highest_paid_value.value = statisticsStore.getOrderWithHighestPaidValue()
		average_paid_value_per_order.value = statisticsStore.getAveragePaidValuePerOrder()

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
		<VCol cols="12" md="4">
			<AnalyticsAward title="Total of customers"
				:text="statisticsStore.statistics?.all.total_of_new_customers ?? 'Unable to load'"
				:subtext="`New the last week: ${statisticsStore.statistics?.weekly.total_of_new_customers ?? 'Unable to load'}`" />
		</VCol>

		<VCol cols="12" md="8">
			<AnalyticsTransactions text="Retrospective" title="Balance of the day" :statistics="statistics" />
		</VCol>
	</VRow>
	<VRow>
		<VCol cols="12" md="6">
			<VCard>
				<VCardItem>
					<VCardTitle>Order With Highest Paid Value</VCardTitle>
				</VCardItem>
				<VCardText>
					<VRow>
						<VCol v-for="item in order_with_highest_paid_value" cols="6" sm="3">
							<div class="d-flex align-center">
								<div class="me-3">
									<div class="v-avatar bg-info v-avatar--density-default v-avatar--rounded v-avatar--variant-flat elevation-1"
										style="width: 42px; height: 42px;"><svg xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
											tag="i" class="v-icon notranslate v-theme--dark iconify iconify--mdi"
											width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
											viewBox="0 0 24 24" style="font-size: 24px; height: 24px; width: 24px;">
											<path fill="currentColor"
												d="M15 18.5c-2.5 0-4.68-1.42-5.76-3.5H15l1-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15l1-2H9.24A6.491 6.491 0 0 1 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3A8.955 8.955 0 0 0 15 3c-3.92 0-7.24 2.5-8.5 6H3l-1 2h4.06c-.06.33-.06.66-.06 1s0 .67.06 1H3l-1 2h4.5c1.26 3.5 4.58 6 8.5 6c2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57Z">
											</path>
										</svg><!----><span class="v-avatar__underlay"></span></div>
								</div>
								<div class="d-flex flex-column">
									<span class="text-caption">
										{{ item.time }}
									</span>
									<span class="text-h6 font-weight-medium">{{ item.value }}</span>
								</div>
							</div>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>
		</VCol>
		<VCol cols="12" md="6">
			<VCard>
				<VCardItem>
					<VCardTitle>Average Paid Value Per Order</VCardTitle>
				</VCardItem>
				<VCardText>
					<VRow>
						<VCol v-for="item in average_paid_value_per_order" cols="6" sm="3">
							<div class="d-flex align-center">
								<div class="me-3">
									<div class="v-avatar bg-info v-avatar--density-default v-avatar--rounded v-avatar--variant-flat elevation-1"
										style="width: 42px; height: 42px;"><svg xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
											tag="i" class="v-icon notranslate v-theme--dark iconify iconify--mdi"
											width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
											viewBox="0 0 24 24" style="font-size: 24px; height: 24px; width: 24px;">
											<path fill="currentColor"
												d="M15 18.5c-2.5 0-4.68-1.42-5.76-3.5H15l1-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15l1-2H9.24A6.491 6.491 0 0 1 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3A8.955 8.955 0 0 0 15 3c-3.92 0-7.24 2.5-8.5 6H3l-1 2h4.06c-.06.33-.06.66-.06 1s0 .67.06 1H3l-1 2h4.5c1.26 3.5 4.58 6 8.5 6c2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57Z">
											</path>
										</svg><!----><span class="v-avatar__underlay"></span></div>
								</div>
								<div class="d-flex flex-column">
									<span class="text-caption">
										{{ item.time }}
									</span>
									<span class="text-h6 font-weight-medium">{{ item.value }}</span>
								</div>
							</div>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>
	<VRow>
		<VCol cols="12" md="12">
			<VCard>
				<VRow no-gutters>
					<VCol cols="12" md="6">
						<VCardItem>
							<VCardTitle>Top 5 Employees With Most Deliveries</VCardTitle>
						</VCardItem>

						<VCardText>
							<VList class="card-list">
								<VListItem
									v-for="item in  statisticsStore.statistics?.all.employee_with_most_deliveries">
									<VListItemTitle class="text-sm font-weight-semibold mb-1">
										Name: {{ item.name }}
									</VListItemTitle>
									<VListItemSubtitle class="text-xs">
										ID: {{ item.delivered_by }}
									</VListItemSubtitle>

									<template #append>
										<VListItemAction class="text-success font-weight-semibold">
											{{ item.delivered_by_count }}
										</VListItemAction>
									</template>
								</VListItem>
							</VList>
						</VCardText>
					</VCol>

					<VDivider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" />

					<VCol cols="12" md="6">
						<VCardItem>
							<VCardTitle>Top 5 Chefs With Most Preparations</VCardTitle>
						</VCardItem>

						<VCardText>
							<VList class="card-list">
								<VListItem v-for="item in  statisticsStore.statistics?.all.chef_with_most_orders">
									<VListItemTitle class="text-sm font-weight-semibold mb-1">
										Name: {{ item.name }}
									</VListItemTitle>
									<VListItemSubtitle class="text-xs">
										ID: {{ item.preparation_by }}
									</VListItemSubtitle>

									<template #append>
										<VListItemAction class="text-success font-weight-semibold">
											{{ item.preparation_by_count }}
										</VListItemAction>
									</template>
								</VListItem>
							</VList>
						</VCardText>
					</VCol>
				</VRow>
			</VCard>
		</VCol>
	</VRow>
	<VRow>
		<VCol md="12" sm="12">
			<VCard>
				<v-card-title align="center">Best Selling Products By Type</v-card-title>
				<VRow class="px-5 py-5">
					<VCol v-for="item in statisticsStore.statistics?.all.best_selling_products_by_type" cols="12" lg="3"
						sm="4">
						<div v-for="product in item">
							<VCard border class="h-100e mb-5" align="center">
								<VCardTitle class="text-uppercase">
									{{ product.type }}
								</VCardTitle>
								<VImg cover :aspect-ratio="1.5" :src="imageUrl(product.photo_url)"
									:lazy-src="imageUrl(product.photo_url)" />

								<VCardItem>
									<VCardTitle>
										{{ product.name }}
									</VCardTitle>
									<VCardText class="mx-0 my-0 px-0 py-0 text-nowrap">
										<p class="font-weight-medium text-base mb-0">
											{{ product.product_count }}
										</p>
									</VCardText>
								</VCardItem>
							</VCard>
						</div>
					</VCol>
				</VRow>
			</VCard>
		</VCol>
	</VRow>
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

