<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import UserTable from "./components/users/UserTable.vue"

const router = useRouter()
const axios = inject('axios')

const users = ref([])

const loadUsers = () => {
  axios.get('users')
    .then((response) => {
      users.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const editUser = (user) => {
  router.push({ name: 'User', params: { id: user.id } })
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <h3 class="mt-5 mb-3">Employees</h3>
  <hr>
  <user-table :users="users" :showId="false" @edit="editUser"></user-table>
</template>

<style scoped>

</style>