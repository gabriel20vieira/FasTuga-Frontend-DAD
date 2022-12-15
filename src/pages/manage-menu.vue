<script setup>

import ProductDialog from "@/layouts/components/ProductDialog.vue";
import { productType, useProductStore } from "@/stores/product";
import { imageUrl } from '@/utils/utils';

// Stores
const productStore = useProductStore()

// Reactive

const navigationTab = ref(productType[0])
const tabItems = productType
const editProduct = ref(null)
const isDialogVisible = ref(false)

const products = computed(() => {
	productStore.filter(navigationTab.value.toLowerCase())
	return productStore.productsFiltered
})

// Actions

const dialogOpen = (product) => {
	editProduct.value = product
	if (product) {
		editProduct.value.image = product?.photo_url
	}
	isDialogVisible.value = true
}

const dialogClose = () => {
	isDialogVisible.value = false
}

const dialogSave = () => {
	productStore.load()
	isDialogVisible.value = false
}

onBeforeMount(async () => {
	await productStore.load()
})

</script>

<template>
	<VRow class="d-flex">
		<VCol sm="12" md="12" lg="10" offset-lg="1">
			<VCard>
				<VTabs v-model="navigationTab" grow style="height: 3.5em;">
					<VBtn color="primary" class="add-cart-btn" @click="dialogOpen(null)">
						<VIcon icon="mdi-hamburger-plus" class="mr-2" /> New product
					</VBtn>
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
										:lazy-src="imageUrl(product.photo_url)" />

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
									<VBtn block class="rounded-t-0" @click="dialogOpen(product)">
										<VIcon size="20" icon="mdi-pencil-outline" class="mr-2" />
										Edit
									</VBtn>
								</VCard>
							</VCol>
						</VRow>
					</VWindowItem>
				</VWindow>
			</VCard>
		</VCol>
	</VRow>

	<VDialog v-model="isDialogVisible" max-width="700" persistent>
		<ProductDialog @close="dialogClose" @save="dialogSave" :product="editProduct" />
	</VDialog>

</template>


<style lang="scss">
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

.add-cart-btn {
	height: auto !important;
	font-size: 1.1em;
	border-radius: 0%;
}
</style>