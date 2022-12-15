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

const close = async () => {
	emit("close");
};

onBeforeMount(() => {
	loading.value = true
})

onMounted(() => {
	loading.value = false
})

onUnmounted(() => {
	emit("close");
})

</script>

<template>
	<VCard title="Product details" class="py-2">
		<VCardText>
			<VRow>
				<VCol cols="12" xs="12" sm="5">
					<div class="upload-image-wrapper">
						<VAvatar rounded color="primary" size="192" variant="tonal" :image="product?.image" />
					</div>
				</VCol>
				<VCol cols="12" xs="12" sm="7" class="pt-0">
					<VCol class="px-0 py-0 my-1">
						<VCardText class="text-subtitle-1"><b>Name:</b> {{ product?.name }}</VCardText>
					</VCol>
					<VCol class="px-0 py-0 my-1">
						<VCardText class="text-subtitle-1"><b>Type:</b> {{ capitalizeFirstLetter(product?.type) }}
						</VCardText>
					</VCol>
					<VCol class="px-0 py-0 my-1">
						<VCardText class="text-subtitle-1"><b>Price:</b> {{ product?.price }}€</VCardText>
					</VCol>
					<VCol class="px-0 py-0 my-1">
						<VCardText class="text-subtitle-1"><b>Description:</b> {{ product?.description }}</VCardText>
					</VCol>
				</VCol>
			</VRow>
		</VCardText>
		<VCardActions class="pr-5">
			<VSpacer />
			<VBtn color="on-secondary" variant="outlined" @click="close">
				Close
			</VBtn>
		</VCardActions>
		<VProgressLinear :active="loading" indeterminate />
	</VCard>
</template>

<style lang="scss">
.upload-image-wrapper {
	max-width: 192px;
	max-height: 192px;
}

.upload-image-icon {
	position: relative;
	bottom: 3.5em;
	left: 8.5em;
}
</style>