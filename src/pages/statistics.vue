<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore()

onMounted(() => {
	console.log(userStore.customer)
})
</script>

<template>
	<VRow class="match-height">

	</VRow>
</template>


<style lang="scss">
.card-avatar {
	aspect-ratio: 1/1;
	object-fit: cover;
	scale: 2;
}

.card-avatar-width {
	width: 6em;
	height: auto;
}
</style>