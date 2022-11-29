<script setup>
import { useRouter } from 'vue-router';
const axios = inject('axios')
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const isPasswordVisible = ref(false)
const loading = ref(false)

const loginErrors = ref({
  name: '',
  email: '',
  password: '',
  other: ''
})

const register = async () => {
  loginErrors.value.name = loginErrors.value.email = loginErrors.value.password = loginErrors.value.other = ''
  loading.value = true

  await axios.post('register', form.value).then((res) => {
    toast.success("Register successful!")
    router.push({ name: 'login' })
  }).catch((error) => {
    loading.value = false

    if (error.code == "ERR_NETWORK") {
      return loginErrors.value.other = "Something went wrong.. 😕"
    }

    loginErrors.value.name = error.response.data.errors.name ? error.response.data.errors.name[0] : ''
    loginErrors.value.email = error.response.data.errors.email ? error.response.data.errors.email[0] : ''
    loginErrors.value.password = error.response.data.errors.password ? error.response.data.errors.password[0] : ''
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
