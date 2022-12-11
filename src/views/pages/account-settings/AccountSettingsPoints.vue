<script setup>
import { useOrdersStore } from '@/stores/orders';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const orders = useOrdersStore()

</script>

<template>
	<VRow>
		<VCol cols="12">
			<VCard title="Account">
				<VCardText class="d-flex">

					<div class="rounded-circle overflow-hidden card-avatar-width me-6">
						<VImg :src="userStore.userPhoto" class="card-avatar" />
					</div>

					<div>
						<VCardText class="py-3 text-subtitle-1">
							<b>Name: </b>{{ userStore.user?.name }}
						</VCardText>
						<VCardText class="py-3 text-subtitle-1">
							<b>Email: </b>{{ userStore.user?.email }}
						</VCardText>
						<VCardText class="py-3 text-subtitle-1" v-if="userStore.isCustomer">
							<b>Points: </b>{{ userStore.user?.customer?.points ?? '' }}
						</VCardText>
					</div>
				</VCardText>

				<VDivider />

				<!-- height -->
				<VCol cols="12" v-if="userStore.isCustomer">
					<VCard title="Order history" class="hide-scroll">
						<VTable height="40vh">
							<thead>
								<tr>
									<th class="text-uppercase">
										Ticket
									</th>
									<th class="text-center text-uppercase">
										Used Points
									</th>
									<th class="text-center text-uppercase">
										Paid
									</th>
									<th class="text-center text-uppercase">
										Date
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="order in orders.orders" :key="order.id">
									<td>{{ order.ticket_number }}</td>
									<td class="text-center">
										{{ order.points_used_to_pay }}
									</td>
									<td class="text-center">
										{{ order.total_paid.replace('.', ',') }}€
									</td>
									<td class="text-center">
										{{ order.date }}
									</td>
								</tr>
							</tbody>
						</VTable>
					</VCard>
				</VCol>

			</VCard>
		</VCol>
	</VRow>
</template>

<style lang="scss">
.card-avatar {
	aspect-ratio: 1/1;
	object-fit: cover;
	scale: 1.8;
}

.card-avatar-width {
	width: 8em;
	height: 15%;
}

.v-table__wrapper {
	-ms-overflow-style: none;
	/* Internet Explorer 10+ */
	scrollbar-width: none;
	/* Firefox */
}

.v-table__wrapper::-webkit-scrollbar {
	display: none;
	/* Safari and Chrome */
}
</style>