<script setup>
import { paymentTypes, useUserStore } from '@/stores/user';
import { CHEF, CUSTOMER, DELIVERY, MANAGER, userRole } from '@/utils/utils';
import { emailRules, nameRules, nifRules, paymentReferenceRules, phoneRules } from '@/utils/validations';
import { computed } from '@vue/reactivity';

const userStore = useUserStore();
const toast = inject('toast')

const isLoading = ref(true)
var accountData = setAccountData()
var customerData = setCustomerData()

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const customerDataLocal = ref(structuredClone(customerData))

const userRoles = [
	{ type: CHEF, title: userRole(CHEF) },
	{ type: DELIVERY, title: userRole(DELIVERY) },
	{ type: MANAGER, title: userRole(MANAGER) },
	{ type: CUSTOMER, title: userRole(CUSTOMER) }
]

const resetForm = () => {
	accountDataLocal.value = structuredClone(accountData)
	customerDataLocal.value = structuredClone(customerData)
}

const changeAvatar = file => {
	const fileReader = new FileReader()
	const { files } = file.target
	if (files && files.length) {
		fileReader.readAsDataURL(files[0])
		fileReader.onload = () => {
			if (typeof fileReader.result === 'string') {
				accountDataLocal.value.image = fileReader.result
			}
		}
	}
}

// reset avatar image
const resetAvatar = () => {
	accountDataLocal.value.image = accountData.userPhoto
}

function setAccountData() {
	return {
		name: userStore.user?.name,
		email: userStore.user?.email,
		type: userStore.user?.type,
		image: userStore?.userPhoto,
		photo_url: userStore.user?.photo_url
	}
}

function setCustomerData() {
	return {
		phone: userStore.customer?.phone,
		nif: userStore.customer?.nif,
		default_payment_type: userStore.customer?.default_payment_type,
		default_payment_reference: userStore.customer?.default_payment_reference
	}
}

const hasChanged = computed(() => {
	return accountData.name != accountDataLocal.value.name
		|| accountData.email != accountDataLocal.value.email
		|| accountData.type != accountDataLocal.value.type
		|| customerData.phone != customerDataLocal.value.phone
		|| customerData.image != customerDataLocal.value.image
		|| customerData.nif != customerDataLocal.value.nif
		|| customerData.default_payment_type != customerDataLocal.value.default_payment_type
		|| customerData.default_payment_reference != customerDataLocal.value.default_payment_reference
})

const saveChanges = async () => {
	isLoading.value = true

	if (accountDataLocal.image != accountData.image) {
		var { image, photo_url, ...data } = accountDataLocal.value
	} else {
		var data = accountDataLocal.value
	}

	await userStore.updateUser(userStore.userId, data)
		.then((res) => {
			accountData = setAccountData()
			if (!userStore.isCustomer) {
				toast.success(res.data.message)
				accountDataLocal.value = structuredClone(accountData)
			}
		}).catch((err) => {

			toast.error(err?.response?.data?.message)
		}).finally(() => isLoading.value = false)

	if (userStore.isCustomer) {
		await userStore.updateCustomer(userStore.customerId, customerDataLocal.value)
			.then((res) => {
				isLoading.value = false
				toast.success(res.data.message)
				customerData = setCustomerData()
				customerDataLocal.value = structuredClone(customerData)
			}).catch((err) => {
				isLoading.value = false
				toast.error(err.response.data.message)
			})
	}
}

onMounted(() => {
	accountData = setAccountData()
	customerData = setCustomerData()
	isLoading.value = false
})

</script>

<template>
	<VRow>
		<VCol cols="12">
			<VCard title="Account Settings">

				<VCardText class="d-flex">

					<div class="rounded-circle overflow-hidden card-avatar-width me-6">
						<VImg :src="accountDataLocal.image" class="card-avatar" />
					</div>

					<form ref="refForm" class="d-flex flex-column justify-center gap-5">
						<div class="d-flex flex-wrap gap-2">
							<VBtn color="primary" @click="refInputEl?.click()" :disabled="isLoading">
								<VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
								<span class="d-none d-sm-block">Upload new photo</span>
							</VBtn>

							<input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden
								@input="changeAvatar">

							<VBtn type="reset" color="error" variant="tonal" @click="resetAvatar"
								:disabled="(accountDataLocal.image == accountData.image) || isLoading">
								<span class="d-none d-sm-block">Reset</span>
								<VIcon icon="mdi-refresh" class="d-sm-none" />
							</VBtn>
						</div>

						<p class="text-body-1 mb-0">
							Allowed JPG, GIF or PNG. Max size of 800K
						</p>
					</form>
				</VCardText>

				<VDivider />

				<VCardText>
					<!-- 👉 Form -->
					<VForm class="mt-6">
						<VRow>
							<VCol md="6" cols="12">
								<VTextField v-model="accountDataLocal.name" label="Name" :rules="nameRules"
									:disabled="isLoading" />
							</VCol>

							<VCol cols="12" md="6">
								<VTextField v-model="accountDataLocal.email" label="E-mail" type="email"
									:disabled="isLoading" :rules="emailRules" />
							</VCol>

							<VCol cols="12" md="6">
								<VSelect v-model="accountDataLocal.type" label="Type" :items="userRoles"
									:disabled="true" item-value="type" item-text="title" />
							</VCol>

							<VCol cols="12" md="6" v-if="userStore.isCustomer">
								<VTextField v-model="customerDataLocal.phone" label="Phone" :rules="phoneRules"
									:disabled="isLoading" />
							</VCol>

							<VCol cols="12" md="6" v-if="userStore.isCustomer">
								<VTextField v-model="customerDataLocal.nif" label="NIF" :rules="nifRules"
									:disabled="isLoading" />
							</VCol>

							<VCol cols="12" md="6" v-if="userStore.isCustomer">
								<VSelect v-model="customerDataLocal.default_payment_type" label="Payment type"
									:disabled="isLoading" :items="paymentTypes" />
							</VCol>

							<VCol cols="12" md="6" v-if="userStore.isCustomer">
								<VTextField v-model="customerDataLocal.default_payment_reference" :disabled="isLoading"
									label="Payment reference"
									:rules="paymentReferenceRules(customerDataLocal.default_payment_reference, customerDataLocal.default_payment_type)" />
							</VCol>
						</VRow>

						<VRow>
							<VCol cols="12" class="d-flex flex-wrap gap-4">
								<VBtn :disabled="!hasChanged" :loading="isLoading" @click="saveChanges">Save changes
								</VBtn>
								<VBtn color="error" variant="tonal" type="reset" @click.prevent="resetForm"
									:disabled="!hasChanged || isLoading">
									Reset
								</VBtn>
							</VCol>
						</VRow>
					</VForm>
				</VCardText>
				<VProgressLinear :active="isLoading" indeterminate />
			</VCard>
		</VCol>
	</VRow>
</template>

<style lang="scss">
.card-avatar {
	aspect-ratio: 1/1;
	object-fit: cover;
	scale: 1.8;
}

.card-avatar-width {
	width: 8em;
	height: 15%;
}
</style>