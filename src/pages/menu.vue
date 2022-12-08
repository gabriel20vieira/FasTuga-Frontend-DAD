<script setup>
import { useCartStore } from "@/stores/cart";
import { productType, useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import Cart from '@/views/dashboards/menu/Cart.vue';
import { inject, onMounted } from "vue";

const productStore = useProductStore();
const serverBaseUrl = inject('serverBaseUrl');
const userStore = useUserStore()
const cartStore = useCartStore()

const imageUrl = (image) => {
	return `${serverBaseUrl}/api/image/${image}`
}

onMounted(() => {
	productStore.loadProducts()
})

const navigationTab = ref(productType[0])
const tabItems = productType
const products = computed(() => {
	productStore.filter(navigationTab.value.toLowerCase())
	return productStore.productsFiltered
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
				<VWindow v-model="navigationTab">
					<VWindowItem v-for="item in tabItems" :key="item" :value="item" class="text-center">

						<VRow class="me-md-12 ms-md-12 gap-sm-8 justify-content-center py-12">
							<VCol class="mx-md-5" cols="6" sm="6" md="3" v-for="product in products" :key="product.id">
								<VCard @click="cartStore.add(product)">
									<VImg :aspect-ratio="1.5" :src="imageUrl(product.photo_url)"
										:lazy-src="imageUrl(product.photo_url)" cover />

									<VCardItem>
										<VCardTitle>{{ product.name }}</VCardTitle>
									</VCardItem>

								</VCard>
							</VCol>
						</VRow>
					</VWindowItem>
				</VWindow>
			</VCard>
		</VCol>

		<VCol md="4" cols="4">
			<VCard>
				<Cart :points="(userStore.user?.customer.points ?? 0)" />
			</VCard>
		</VCol>
	</VRow>
</template>


<style lang="scss">
.justify-content-center {
	justify-content: space-evenly !important;
}
</style>