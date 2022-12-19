<script setup>
import avatar from '@/assets/images/avatars/avatar-12.png';
import triangleDark from '@/assets/images/misc/triangle-dark.png';
import triangleLight from '@/assets/images/misc/triangle-light.png';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
	return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

const props = defineProps(["title", "value", "subtitle", "isLoading", "subvalue", "image"]);

const { title, value, subtitle, subvalue, image } = toRefs(props);
</script>

<template>
	<VCard :title="title" class="position-relative">
		<VCardText>
			<VProgressCircular indeterminate v-if="props.isLoading" />
			<div v-else>
				<h5 class="text-2xl font-weight-medium text-primary">{{ value }}</h5>
			</div>
			<VChip v-if="(subtitle || subvalue) && !props.isLoading" class="px-2 mt-1 h-auto" style="font-size: small;">
				<span>
					{{ subtitle }}: {{ subvalue }}
				</span>
			</VChip>
		</VCardText>

		<VImg :src="image && triangleBg" class="triangle-bg" />

		<VImg v-if="image" :src="image && avatar" class="avatar" />
	</VCard>
</template>

<style lang="scss">
.triangle-bg {
	position: absolute;
	inline-size: 5.5rem;
	inset-block-end: 0;
	inset-inline-end: 0;
}

.avatar {
	position: absolute;
	inset-block-end: -10%;
	inset-inline-end: -1%;
	width: 95px;
	padding: 17.5px;
}
</style>
