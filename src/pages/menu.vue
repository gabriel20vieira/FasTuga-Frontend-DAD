<script setup>
import Cart from '@/views/dashboards/menu/Cart.vue';

import { useCartStore } from "@/stores/cart";
import { productType, useProductStore } from "@/stores/product";
import { inject } from "vue";

const productStore = useProductStore()
const cartStore = useCartStore()
const serverBaseUrl = inject('serverBaseUrl');

const imageUrl = (image) => {
	return `${serverBaseUrl}/api/image/${image}`
}

const navigationTab = ref(productType[0])
const tabItems = productType
const products = computed(() => {
	productStore.filter(navigationTab.value.toLowerCase())
	return productStore.productsFiltered
})

onMounted(async () => {
	await productStore.load()
})

</script>

<template>
	<VRow>
		<VCol md="8" sm="12">
			<VCard>
				<VTabs v-model="navigationTab" centered style="height: 4em;">
					<VTab v-for="item in tabItems" :key="item" :value="item" style="height:auto; font-size: 1.1em;">
						{{ item }}
					</VTab>
				</VTabs>

				<VDivider />

				<!-- tabs content -->
				<VWindow v-model="navigationTab" class="menu-card hide-scroll">
					<VWindowItem v-for="item in tabItems" :key="item" :value="item">

						<VRow class="justify-content-center py-8 px-6">
							<VCol v-for="product in products" :key="product.id" cols="12" lg="4" sm="6">
								<VCard>
									<VBtn size="2.6em" variant="elevated" color="primary" class="me-n3 mt-n1 add-cart"
										icon @click="cartStore.add(product)">
										<VIcon size="24" icon="mdi-cart-plus" />
									</VBtn>

									<!-- Details -->
									<!-- <VBtn size="2.6em" variant="elevated" color="primary"
										class="me-n3 mt-n1 cart-details" icon @click="cartStore.add(product)">
										<VIcon size="22" icon="mdi-more" />
									</VBtn> -->

									<VImg cover :aspect-ratio="1.5" :src="imageUrl(product.photo_url)"
										:lazy-src="imageUrl(product.photo_url)" />

									<VCardItem>
										<VCardText class="mx-0 my-0 px-0 py-0 text-nowrap">
											{{ product.price }}€ - {{ product.name }}
										</VCardText>
									</VCardItem>

								</VCard>
							</VCol>
						</VRow>
					</VWindowItem>
				</VWindow>
			</VCard>
		</VCol>

		<VCol md="4" sm="12">
			<VCard>
				<Cart />
			</VCard>
		</VCol>
	</VRow>
</template>


<style lang="scss">
.add-cart {
	position: absolute;
	z-index: 999;
	top: 1em;
	right: 2em;
}

.cart-details {
	position: absolute;
	z-index: 999;
	top: 4.5em;
	right: 2em;
}

.menu-card {
	max-height: 80vh !important;
	overflow-y: auto !important;
}

.justify-content-center {
	justify-content: space-evenly !important;
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