<script setup>
import logo from '@/assets/logo.png';
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  email: '',
  password: '',
  remember: true,
})

const isPasswordVisible = ref(false)
const loginError = ref(null)
const loading = ref(false)

const login = async () => {
  loginError.value = null

  if (form.value.email == "" || form.value.password == "")
    return loginError.value = "Please fill both inputs."

  loading.value = true

  if (await userStore.login(form.value)) {
    return router.push({ name: 'index' })
  } else {
    loading.value = false
    return loginError.value = "Invalid Login 😕"
  }
}



</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VImg :src="logo" class="ma-5" />
      <VCardText>
        <VForm @submit.prevent="() => { }">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.email" label="Email" type="email" :disabled="loading" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Password" :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" :disabled="loading" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-4 mb-4">
                <VCheckbox v-model="form.remember" label="Remember me" :disabled="loading" />
              </div>

              <VAlert color="error" class="mb-5 text-center" v-show="loginError">
                {{ loginError }}
              </VAlert>

              <!-- login button -->
              <VBtn type="submit" block @click="login" :loading="loading">
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <span>Don't have an account?</span>
              <RouterLink class="text-primary ms-2" :to="{ name: 'register' }">
                Sign up here!
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
