<script setup>
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';


const serverBaseUrl = inject('serverBaseUrl')
const props = defineProps(['points'])
const cartStore = useCartStore()
const userStore = useUserStore()

</script>

<template>
	<VCard>
		<VCardItem>
			<VCardTitle class="text-h5">Cart</VCardTitle>
		</VCardItem>

		<VCardText class="pt-4">
			<div class="d-flex align-center">
				<h4 class="text-h5 me-2">
					{{ (Math.round(cartStore.total * 100) / 100) }}€
				</h4>
			</div>
			<span class="text-xs" v-if="userStore.isCustomer">{{ props.points }}</span>

			<VList class="card-list mt-9 hide-scroll" max-height="60vh" style="transition: 0.5ms;">
				<VListItem v-if="(cartStore.products.length == 0)">
					<VListItemTitle class="text-sm font-weight-semibold mb-1">
						A little empty 😮
					</VListItemTitle>
				</VListItem>

				<VListItem v-for="product in cartStore.products" :key="product.id">
					<template #prepend>
						<VResponsive :aspect-ratio="(3 / 2)">
							<VAvatar size="60" rounded="true" class="fill-image"
								:image="`${serverBaseUrl}/api/image/${product.photo_url}`" />
						</VResponsive>
					</template>

					<VListItemTitle class="text-sm font-weight-semibold mb-1 mx-5">
						{{ product.name }}
					</VListItemTitle>

					<template #append>
						<VCard flat>
							<div>
								<h6 class="text-sm mb-2">
									{{ product.price }}€ x {{ product.quantity }}
								</h6>
							</div>
							<div>
								<VBtn icon variant="text" color="primary" size="small"
									@click="cartStore.remove(product)">
									<VIcon icon="mdi-trash-can-outline" size="24" />
								</VBtn>
							</div>
						</VCard>
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
