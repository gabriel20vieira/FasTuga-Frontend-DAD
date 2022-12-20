<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const newPassword = ref('')
const confirmPassword = ref('')

const isLoading = ref(false)

const updatePassword = async () => {
	isLoading.value = true
	await userStore.updatePassword(newPassword.value, confirmPassword.value).then((res) => {
		if (res) {
			newPassword.value = ""
			confirmPassword.value = ""
		}
		toast.success(res.message ?? 'Password changes with success! 🤗')
	})
		.catch((err) => toast.error(err.response.data.message))
		.finally(() => isLoading.value = false)
}


</script>

<template>
	<VRow>
		<!-- SECTION: Change Password -->
		<VCol cols="12">
			<VCard title="Change Password">
				<VForm>
					<VCardText>

						<!-- 👉 New Password -->
						<VRow class="my-2">
							<VCol cols="12" md="6">
								<!-- 👉 new password -->
								<VTextField v-model="newPassword" :type="isNewPasswordVisible ? 'text' : 'password'"
									:append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
									label="New Password" :disabled="isLoading"
									:rules="[v => !!v || v.length <= 8 || 'Password too short.']"
									@click:append-inner="isNewPasswordVisible = !isNewPasswordVisible" />
							</VCol>
						</VRow>

						<VRow class="my-2">
							<VCol cols="12" md="6">
								<!-- 👉 confirm password -->
								<VTextField v-model="confirmPassword"
									:type="isConfirmPasswordVisible ? 'text' : 'password'"
									:append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
									label="Confirm New Password" :disabled="isLoading"
									:rules="[v => !!v || v.length <= 8 || 'Password too short.']"
									@click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible" />
							</VCol>
						</VRow>
					</VCardText>

					<!-- 👉 Action Buttons -->
					<VCardText class="d-flex flex-wrap gap-4">
						<VBtn @click.prevent="updatePassword" :loading="isLoading">Save changes</VBtn>
						<VBtn type="reset" color="error" variant="tonal"
							:disabled="!(newPassword || confirmPassword) || isLoading"> Reset </VBtn>
					</VCardText>
				</VForm>
			</VCard>
		</VCol>
		<!-- !SECTION -->

	</VRow>
</template>
