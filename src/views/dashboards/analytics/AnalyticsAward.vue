<script setup>
import triangleDark from '@/assets/images/misc/triangle-dark.png';
import triangleLight from '@/assets/images/misc/triangle-light.png';
import trophy from '@/assets/images/misc/trophy.png';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
	return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

const props = defineProps(["title", "subtitle", "text", "subtext"]);

const { title, subtitle, text, subtext } = toRefs(props);

</script>

<template>
	<VCard :title="title" :subtitle="subtitle" class="position-relative">
		<VCardText>
			<h5 class="text-2xl font-weight-medium text-primary">
				{{ text }}
			</h5>
			<p>{{ subtext }}</p>
		</VCardText>

		<VImg :src="triangleBg" class="triangle-bg flip-in-rtl" />

		<VImg :src="trophy" class="trophy" width="50" />
	</VCard>
</template>

<style lang="scss">
.triangle-bg {
	position: absolute;
	inline-size: 10.375rem;
	inset-block-end: 0;
	inset-inline-end: 0;
}

.trophy {
	position: absolute;
	inline-size: 4.9375rem;
	inset-block-end: 2rem;
	inset-inline-end: 2rem;
}
</style>
