<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import EmployeesTable from '../layouts/components/EmployeesTable.vue'

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
  console.log('TODO: EDIT USER');
  //router.push({ name: 'User', params: { id: user.id } })
}

const deleteUser = (user) => {
  console.log('TODO: DELETE USER');
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <!-- <user-table :users="users" :showId="false" @edit="editUser"></user-table> -->
  <VCol cols="12">
    <VCard title="Employees">
      <EmployeesTable :employees="users" @edit="editUser" @delete="deleteUser"></EmployeesTable>
    </VCard>
  </VCol>
</template>

<style scoped>

</style>