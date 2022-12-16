<script setup>
import Cart from '@/layouts/components/Cart.vue';
import ProductDetailsDialog from '@/layouts/components/ProductDetailsDialog.vue';

import { useCartStore } from "@/stores/cart";
import { productType, useProductStore } from "@/stores/product";
import { imageUrl } from '@/utils/utils';

const productStore = useProductStore()
const cartStore = useCartStore()

const navigationTab = ref(productType[0])
const tabItems = productType
const isDialogVisibleDetails = ref(false)
const showProduct = ref(null)
const products = computed(() => {
	productStore.filter(navigationTab.value.toLowerCase())
	return productStore.productsFiltered
})

const dialogOpen = (product) => {
	showProduct.value = product
	if (product) {
		showProduct.value.image = product?.photo_url
	}
	isDialogVisibleDetails.value = true
}

const dialogClose = () => {
	isDialogVisibleDetails.value = false
}

onBeforeMount(async () => {
	await productStore.load()
})

</script>

<template>
	<VRow>
		<VCol md="8" sm="12">
			<VCard>
				<VTabs v-model="navigationTab" grow style="height: 3.5em;">
					<VTab v-for="item in tabItems" :key="item" :value="item" style="height:auto; font-size: 1.1em;">
						{{ item }}
					</VTab>
				</VTabs>

				<VDivider />

				<!-- tabs content -->
				<VWindow v-model="navigationTab" class="menu-card hide-scroll">
					<VWindowItem v-for="item in tabItems" :key="item" :value="item">

						<VRow class="align-cards py-8 px-6">
							<VCol v-for="product in products" :key="product.id" cols="12" lg="3" sm="4">
								<VCard class="h-100">
									<VImg cover :aspect-ratio="1.5" :src="imageUrl(product.photo_url)"
										:lazy-src="imageUrl(product.photo_url)" @click="dialogOpen(product)"
										style="cursor: pointer;" />

									<VCardItem>
										<VCardTitle>
											{{ product.name }}
										</VCardTitle>
										<VCardText class="mx-0 my-0 px-0 py-0 text-nowrap">
											<p class="font-weight-medium text-base mb-0">
												{{ product.price }}€
											</p>
										</VCardText>
									</VCardItem>
									<VBtn block class="rounded-t-0" @click="cartStore.add(product)">
										<VIcon size="20" icon="mdi-cart-plus" class="mr-2" />
										Add to cart
									</VBtn>
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

	<VDialog v-model="isDialogVisibleDetails" max-width="700">
		<ProductDetailsDialog @close="dialogClose" :product="showProduct" />
	</VDialog>
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

.align-cards {
	justify-content: flex-start !important;
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