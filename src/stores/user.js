import defaultAvatar from '@/assets/images/avatars/avatar-8.png'
import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const axios = inject('axios')
  const serverBaseUrl = inject('serverBaseUrl')

  const user = ref(null)

  const userPhoto = computed(() => {
    if (!user.value?.photo_url) {
      return defaultAvatar
    }
    return serverBaseUrl + '/api/image/' + user.value.photo_url
  })

  async function fetchEmployeePhoto(user) {
    return user.photo_url ? serverBaseUrl + '/api/image/' + user.photo_url : defaultAvatar
  }

  const userId = computed(() => {
    return user.value?.id ?? -1
  })

  async function loadUser() {
    try {
      const response = await axios.get('users/me')
      user.value = response.data.data
    } catch (error) {
      clearUser()
      throw error
    }
  }

  async function loadAllUsers(page) {
    return await axios.get(`users?page=${page || 1}`)
  }

  function clearUser() {
    delete axios.defaults.headers.common.Authorization
    sessionStorage.removeItem('token')
    user.value = null
  }

  async function login(credentials) {
    try {
      const response = await axios.post('login', credentials)
      axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token

      //Remember me
      if (credentials.remember) sessionStorage.setItem('token', response.data.token)

      user.value = response.data.data
      return true
    } catch (error) {
      clearUser()
      return false
    }
  }

  async function logout() {
    try {
      await axios.post('logout')
      clearUser()
      return true
    } catch (error) {
      return false
    }
  }

  async function restoreToken() {
    let storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + storedToken
      await loadUser()
      return true
    }
    clearUser()
    return false
  }

  return { user, userId, userPhoto, login, logout, restoreToken, loadAllUsers, fetchEmployeePhoto }
})
