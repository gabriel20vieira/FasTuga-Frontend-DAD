<script setup>
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';

const serverBaseUrl = inject('serverBaseUrl')
const cartStore = useCartStore()
const userStore = useUserStore()

function capitalizeFirstLetter(string) {
	if (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
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
					{{ cartStore.totalRound == 0 ? ' - ' : cartStore.totalRound }}€
				</h4>
				<h4 class="text-h4 me-2" v-if="cartStore.isUsingPoints">
					{{ cartStore.totalDiscount == 0 ? ' - ' : cartStore.totalDiscount }}€
				</h4>
			</div>
			<div v-if="(userStore?.isCustomer ?? false)" class="mt-2">
				<div class="text-success text-xs">Accumulated points: {{ cartStore?.accumulatedPoints ?? 0 }}</div>
				<div class="text-xs">Current points: {{ cartStore.currentUserPoints }}</div>
				<div class="mt-3">
					<span>Points to use: {{ cartStore.order?.points_used_to_pay ?? 0 }}</span>
					<span class="ms-5">
						<VBtn icon variant="text" color="primary" size="small" @click="cartStore.removeUsePoints()">
							<VIcon icon="mdi-minus" size="20" />
						</VBtn>
						<VBtn icon variant="text" color="primary" size="small" @click="cartStore.addUsePoints()">
							<VIcon icon="mdi-plus" size="20" />
						</VBtn>
					</span>
				</div>
			</div>


			<VList class="card-list mt-9">
				<VListItem v-if="((cartStore.order?.items.length ?? 0) == 0)">
					<VListItemTitle class="text-sm font-weight-semibold mb-1">
						A little empty 😮
					</VListItemTitle>
				</VListItem>
				<VListItem v-for="product in cartStore.order?.items ?? []" :key="product.id">
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
						<div>
							<h6 class="text-sm mb-2">
								{{ product.price }}€ x {{ product.quantity }}
							</h6>
							<VBtn icon variant="text" color="error" size="small" @click="cartStore.remove(product)">
								<VIcon icon="mdi-trash-can-outline" size="24" />
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
</style>
