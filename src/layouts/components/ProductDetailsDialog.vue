<script setup>

import { capitalizeFirstLetter, imageUrl } from "@/utils/utils";
import { onUnmounted } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps(['product'])
const loading = ref(true)
const product = ref({
	...props.product,
	image: imageUrl(props.product?.photo_url)
})

onUnmounted(() => {
	emit("close");
})

</script>

<template>
	<VCard title="Product Details" class="product-view">
		<VCardText>
			<VRow>
				<VCol cols="12" xs="12" sm="5">
					<VAvatar class="product-img" rounded color="primary" variant="tonal" :image="product?.image" />
				</VCol>
				<VCol cols="12" xs="12" sm="7" class="pt-0">
					<VCol class="px-0 py-2 my-1">
						<VCardText class="text-body-2 py-0 text-primary">Name</VCardText>
						<VCardText class="text-subtitle-1 py-0">{{ product?.name }}</VCardText>
					</VCol>
					<VRow>
						<VCol>
							<VCardText class="text-body-2 py-0 text-primary">Type</VCardText>
							<VCardText class="text-subtitle-1 py-0">{{ capitalizeFirstLetter(product?.type) }}
							</VCardText>
						</VCol>
						<VCol>
							<VCardText class="text-body-2 py-0 text-primary">Price</VCardText>
							<VCardText class="text-subtitle-1 py-0">{{ product?.price }}€</VCardText>
						</VCol>
					</VRow>
					<VCol class="px-0 py-2 my-1">
						<VCardText class="text-body-2 py-0 text-primary">Description</VCardText>
						<VCardText class="text-subtitle-1 py-0">{{ product?.description }}</VCardText>
					</VCol>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>
</template>

<style lang="scss">
.product-view .product-img {
	height: auto;
	width: 256px;
}
</style>