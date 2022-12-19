<script setup>
import { paymentTypes } from '@/stores/user';
import { useRouter } from 'vue-router';
const axios = inject('axios')
const toast = inject('toast')
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  nif: '',
  default_payment_type: 'PAYPAL',
  default_payment_reference: '',
})

const isPasswordVisible = ref(false)
const loading = ref(false)

const loginErrors = ref({
  name: '',
  password: '',
  password_confirmation: '',
  phone: '',
  nif: '',
  default_payment_type: '',
  default_payment_reference: '',
  other: ''
})

function resetLoginErrors() {
  loginErrors.value.name = ''
  loginErrors.value.email = ''
  loginErrors.value.password = ''
  loginErrors.value.password_confirmation = ''
  loginErrors.value.phone = ''
  loginErrors.value.nif = ''
  loginErrors.value.default_payment_type = ''
  loginErrors.value.default_payment_reference = ''
  loginErrors.value.other = ''
}

function setLoginErrors(data) {
  loginErrors.value.name = data?.name
  loginErrors.value.email = data?.email
  loginErrors.value.password = data?.password
  loginErrors.value.password_confirmation = data.password_confirmation
  loginErrors.value.phone = data?.phone
  loginErrors.value.nif = data?.nif
  loginErrors.value.default_payment_type = data?.default_payment_type
  loginErrors.value.default_payment_reference = data?.default_payment_reference
  loginErrors.value.other = data?.other
}

const register = async () => {
  resetLoginErrors()
  loading.value = true

  await axios.post('register', form.value).then((res) => {
    toast.success("Register successful!")
    router.push({ name: 'login' })
  }).catch((error) => {
    loading.value = false
    if (error.code == "ERR_NETWORK") {
      return loginErrors.value.other = "Something went wrong.. 😕"
    }
    setLoginErrors(error.response.data.errors)
  })
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1 align">
          Create Account
        </h5>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => { }">
          <VRow>
            <!-- Name -->
            <VCol cols="12">
              <VTextField v-model="form.name" label="Name" :disabled="loading" :error-messages="loginErrors.name" />
            </VCol>

            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.email" label="Email" type="email" :disabled="loading"
                :error-messages="loginErrors.email" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Password" :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" class="mb-1" :disabled="loading"
                :error-messages="loginErrors.password" />
            </VCol>

            <!-- password confirmation -->
            <VCol cols="12">
              <VTextField v-model="form.password_confirmation" label="Password confirmation"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" class="mb-1" :disabled="loading"
                :error-messages="loginErrors.password_confirmation" />
            </VCol>

            <VDivider class="my-4 mx-3" />

            <!-- phone -->
            <VCol cols="12">
              <VTextField v-model="form.phone" label="Phone" class="mb-1" :disabled="loading"
                :error-messages="loginErrors.phone" />
            </VCol>

            <!-- nif -->
            <VCol cols="12">
              <VTextField v-model="form.nif" label="NIF" class="mb-1" :disabled="loading"
                :error-messages="loginErrors.nif" />
            </VCol>

            <!-- default payment type -->
            <VCol cols="12">
              <VSelect v-model="form.default_payment_type" label="Payment type" class="mb-1" :disabled="loading"
                :error-messages="loginErrors.default_payment_type" :items="paymentTypes" />
            </VCol>

            <!-- default payment reference -->
            <VCol cols="12">
              <VTextField v-model="form.default_payment_reference" label="Payment reference" class="mb-1"
                :disabled="loading" :error-messages="loginErrors.default_payment_reference" />
            </VCol>

            <VCol cols="12">
              <VAlert color="error" class="mb-5 text-center" v-show="loginErrors.other">
                {{ loginErrors.other }}
              </VAlert>

              <VBtn type="submit" block @click="register" :loading="loading">
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <RouterLink class="text-primary ms-2" to="login">
                Sign in here!
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
