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

onMounted(() => {
	productStore.loadProducts()
})

</script>

<template>
	<VRow>
		<VCol md="8" cols="8">
			<VCard>
				<VTabs v-model="navigationTab" centered style="height: 4em;">
					<VTab v-for="item in tabItems" :key="item" :value="item" style="height:auto; font-size: 1.1em;">
						{{ item }}
					</VTab>
				</VTabs>

				<VDivider />

				<!-- tabs content -->
				<VWindow v-model="navigationTab" class="menu-card hide-scroll">
					<VWindowItem v-for="item in tabItems" :key="item" :value="item" class="text-center">

						<VRow class="me-md-12 ms-md-12 gap-sm-8 justify-content-center py-12">
							<VCol class="mx-md-5" cols="4" md="3" v-for="product in products" :key="product.id">
								<VCard @click="cartStore.add(product)">
									<VImg :aspect-ratio="1.5" :src="imageUrl(product.photo_url)"
										:lazy-src="imageUrl(product.photo_url)" cover />

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

		<VCol md="4" cols="4" sm="12">
			<VCard>
				<Cart />
			</VCard>
		</VCol>
	</VRow>
</template>


<style lang="scss">
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