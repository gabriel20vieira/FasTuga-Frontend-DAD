<script setup>
import { ProductType, useProductStore } from "@/stores/product";
import { inject, onMounted } from "vue";
const productStore = useProductStore();
const serverBaseUrl = inject('serverBaseUrl');

const imageUrl = (image) => {
	return `${serverBaseUrl}/api/image/${image}`
}

onMounted(() => {
	productStore.loadProducts()
})

const filterHotDishes = () => {
	productStore.filter(ProductType.HOT_DISH)
}

const filterColdDishes = () => {
	productStore.filter(ProductType.COLD_DISH)
}

const filterDesserts = () => {
	productStore.filter(ProductType.DESSERT)
}

const filterDrinks = () => {
	productStore.filter(ProductType.DRINK)
}

</script>

<template>
	<div>
		<VCol>


		</VCol>

		<VCol>

			<p class="text-4xl mb-12 mx-auto">
				Menu
			</p>

			<VBtn @click="filterHotDishes">Hot</VBtn>
			<VBtn @click="filterColdDishes">Cold</VBtn>
			<VBtn @click="filterDrinks">Drink</VBtn>
			<VBtn @click="filterDesserts">Dessert</VBtn>

			<VRow class="match-height me-md-12 ms-md-12 gap-sm-8">
				<VCol class="mx-md-5" cols="6" sm="6" md="3" v-for="product in productStore.productsFiltered"
					:key="product.id">
					<VCard class="">
						<VImg :aspect-ratio="1.5" :src="imageUrl(product.photo_url)"
							:lazy-src="imageUrl(product.photo_url)" cover />

						<VCardItem>
							<VCardTitle>{{ product.name }}</VCardTitle>
						</VCardItem>

						<!-- <VCardText>
						Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state
						tourism
						minister
						predicts Cancun will draw as many visitors in 2006 as it did two years ago.
					</VCardText> -->
					</VCard>
				</VCol>
			</VRow>
		</VCol>
	</div>
</template>
