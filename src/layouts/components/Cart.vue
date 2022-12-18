<script setup>
import { useCartStore } from '@/stores/cart';
import { useOrdersStore } from '@/stores/orders';
import { paymentTypes, useUserStore } from '@/stores/user';
import { capitalizeFirstLetter } from '@/utils/utils';
import { paymentReferenceRules } from '@/utils/validations';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const serverBaseUrl = inject('serverBaseUrl')
const toast = inject('toast')
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const orderStore = useOrdersStore()

const paymentType = ref("")
const paymentReference = ref("")
const loading = ref(false)

const errors = ref({
	type: [],
	reference: [],
})


async function makeOrder() {
	loading.value = true

	errors.value.type = []
	errors.value.reference = []

	cartStore.fillPayment(
		paymentType.value,
		paymentReference.value,
	)

	await cartStore.makeOrder().then(async res => {
		loading.value = false
		toast.success(res.data.message + "\tTicket: " + res.data.data.ticket_number)
		userStore.currentOrders.push(res.data.data)
		if (userStore?.isLogged) {
			await userStore.loadUser()
		}
		await orderStore.fetchBoard()
		router.push({ name: 'board' })
	}).catch(err => {
		loading.value = false
		if (err && err.response.data.errors) {
			errors.value.type = err.response.data.errors['payment.type'] ?? []
			errors.value.reference = err.response.data.errors['payment.reference'] ?? []
			toast.error(capitalizeFirstLetter(err.response.data.message.replace('.', ' ')))
		}

		if (err && err.response.data.message) {
			toast.error(capitalizeFirstLetter(err.response.data.message))
		}
	})
}
</script>

<template>
	<VCard>
		<VCardItem>
			<VCardTitle>Cart</VCardTitle>
		</VCardItem>

		<VCardText class="pt-4">
			<div class="d-flex align-center">
				<h4 :class="['text-h4', 'me-2', { 'text-decoration-line-through': cartStore.isUsingPoints }]">
					{{ cartStore.totalRound == 0 ? '0.00' : cartStore.totalRound }}€
				</h4>
				<h4 class="text-h4 me-2" v-if="cartStore.isUsingPoints">
					{{ cartStore.totalDiscount == 0 ? '0.00' : cartStore.totalDiscount }}€
				</h4>
			</div>
			<div v-if="(userStore?.isCustomer ?? false)" class="mt-2">
				<div class="text-success text-xs">Accumulated points: {{ cartStore?.accumulatedPoints ?? 0 }}</div>
				<div class="text-xs">Current points: {{ cartStore.currentUserPoints }}</div>
				<div class="mt-3">
					<span>Points to use: {{ cartStore.order?.points_used_to_pay ?? 0 }}</span>
					<span class="ms-5">
						<VBtn :disabled="cartStore.order?.points_used_to_pay <= 0" icon variant="text" color="primary"
							size="small" @click="cartStore.removeUsePoints()">
							<VIcon icon="mdi-minus" size="20" />
						</VBtn>
						<VBtn :disabled="cartStore.currentUserPoints < 10" icon variant="text" color="primary"
							size="small" @click="cartStore.addUsePoints()">
							<VIcon icon="mdi-plus" size="20" />
						</VBtn>
					</span>
				</div>
			</div>

			<VDivider class="my-5" />

			<div class="mt-4" v-if="!userStore.isCustomer">
				<VSelect class="mt-4" v-model="paymentType" label="Payment type" :items="paymentTypes"
					:error-messages="errors?.type" />
				<VTextField class="mt-4" v-model="paymentReference" label="Payment reference"
					:error-messages="errors?.reference" :rules="paymentReferenceRules(paymentReference, paymentType)" />
			</div>
			<div class="mt-4">
				<VBtn :disabled="!cartStore.hasItems" :loading="loading" width="100%" variant="elevated" color="primary"
					@click="makeOrder">
					Order
				</VBtn>
			</div>

			<VDivider class="my-5" />

			<VList class="card-list mt-9">
				<VListItem v-if="((cartStore.order?.products.length ?? 0) == 0)">
					<VListItemTitle class="text-sm font-weight-semibold mb-1">
						A little empty 😮
					</VListItemTitle>
				</VListItem>
				<VListItem v-for="product in cartStore.order?.products ?? []" :key="product.id">
					<template #prepend>
						<VAvatar rounded :image="`${serverBaseUrl}/api/image/${product.photo_url}`" />
					</template>

					<VListItemTitle class="text-sm font-weight-semibold mb-1">
						{{ product.name }}
					</VListItemTitle>
					<VListItemSubtitle class="text-xs">
						{{ capitalizeFirstLetter(product.type) }}
					</VListItemSubtitle>

					<template #append>
						<div class="text-end">
							<h6 class="text-sm">
								{{ product.price }}€ x{{ product.quantity }}
							</h6>
							<div class="transition" v-if="product.quantity > 1">
								<VBtn icon variant="text" color="primary" size="small"
									@click="cartStore.removeOne(product)">
									<VIcon icon="mdi-minus" size="20" />
								</VBtn>
								<VBtn icon variant="text" color="primary" size="small" @click="cartStore.add(product)">
									<VIcon icon="mdi-plus" size="20" />
								</VBtn>
							</div>
							<VBtn class="transition" v-else icon variant="text" color="error" size="small"
								@click="cartStore.remove(product)">
								<VIcon icon="mdi-trash-can-outline" size="20" />
							</VBtn>
						</div>
					</template>
				</VListItem>
			</VList>
		</VCardText>
	</VCard>

</template>

<style lang="scss" scoped>
.card-list {
	--v-card-list-gap: 2.625rem;
}

.hide-scroll {
	-ms-overflow-style: none;
	/* Internet Explorer 10+ */
	scrollbar-width: none;
	/* Firefox */
}

.hide-scroll::-webkit-scrollbar {
	display: none;
	/* Safari and Chrome */
}

.transition {
	transition: 500ms;
}
</style>
