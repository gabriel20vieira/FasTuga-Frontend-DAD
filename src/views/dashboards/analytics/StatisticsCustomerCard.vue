<script setup>
import avatar from '@/assets/images/avatars/avatar-12.png';
import triangleDark from '@/assets/images/misc/triangle-dark.png';
import triangleLight from '@/assets/images/misc/triangle-light.png';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
	return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

const props = defineProps(["title", "value", "lastWeekValue", "isLoading"]);

const { title, value, lastWeekValue } = toRefs(props);

</script>

<template>
	<VCard :title="title" class="position-relative">
		<VCardText>
			<div>
				<VProgressCircular indeterminate v-if="props.isLoading" />
				<h5 v-else class="text-2xl font-weight-medium text-primary">{{ value }}</h5>
			</div>
			<VChip class="px-2 mt-1 h-auto" style="font-size: small;">From Last Week: {{ lastWeekValue }}</VChip>
		</VCardText>

		<VImg :src="triangleBg" class="triangle-bg" />

		<VImg :src="avatar" class="avatar" />
	</VCard>
</template>

<style lang="scss">
.triangle-bg {
	position: absolute;
	inline-size: 7.5rem;
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
