<script setup>
import { useStatisticsStore } from '@/stores/statistics';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const statisticsStore = useStatisticsStore()

onBeforeMount(() => {
	statisticsStore.load()
})
</script>

<template>
	<VRow>
		<!-- SECTION: Change Password -->
		<VCol cols="12">

			<template v-if="userStore.isChef">
				Quantity of cooked items: {{ statisticsStore.statistics?.items_cooked }}<br>
				Most cooked items: {{ statisticsStore.statistics?.most_cooked }}
			</template>

			<template v-if="userStore.isCustomer">
				Total of orders: {{ statisticsStore.statistics?.total_of_orders }}<br>
				Mean of paid per order: {{ statisticsStore.statistics?.mean_of_paid_per_order }}<br>
				Points accumulated: {{ userStore.customer?.points }}<br>
				Most gained points on order: {{ statisticsStore.statistics?.most_points_on_order }}<br>
				Biggest discount with points: {{ statisticsStore.statistics?.biggest_discount }}<br>
				Most bought products: {{ statisticsStore.statistics?.most_chosen_product_per_type }}
			</template>

			<template v-if="userStore.isDelivery">
				Orders delivered: {{ statisticsStore.statistics?.orders_delivered }}<br>
				Delivered on the last hour: {{ statisticsStore.statistics?.orders_last_hour }}
			</template>
		</VCol>
		<!-- !SECTION -->

	</VRow>
</template>
