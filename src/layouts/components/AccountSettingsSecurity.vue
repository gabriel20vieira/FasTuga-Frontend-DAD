<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const newPassword = ref('')
const confirmPassword = ref('')

const updatePassword = () => {
	userStore.updatePassword(newPassword.value, confirmPassword.value, (res) => {
		if (res) {
			newPassword.value = ""
			confirmPassword.value = ""
		}
	})
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
									label="New Password"
									@click:append-inner="isNewPasswordVisible = !isNewPasswordVisible" />
							</VCol>
						</VRow>

						<VRow class="my-2">
							<VCol cols="12" md="6">
								<!-- 👉 confirm password -->
								<VTextField v-model="confirmPassword"
									:type="isConfirmPasswordVisible ? 'text' : 'password'"
									:append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
									label="Confirm New Password"
									@click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible" />
							</VCol>
						</VRow>
					</VCardText>

					<!-- 👉 Action Buttons -->
					<VCardText class="d-flex flex-wrap gap-4">
						<VBtn @click.prevent="updatePassword">Save changes
						</VBtn>
						<VBtn type="reset" color="error" variant="tonal" :disabled="!(newPassword || confirmPassword)">
							Reset
						</VBtn>
					</VCardText>
				</VForm>
			</VCard>
		</VCol>
		<!-- !SECTION -->

	</VRow>
</template>
