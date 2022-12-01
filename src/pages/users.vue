<script setup>
import { useUserStore } from '@/stores/user';
import { inject, onMounted, ref } from 'vue';
import ConfirmationDialog from '../layouts/components/ConfirmationDialog.vue';
import UserDetailsDialog from '../layouts/components/EmployeeDialog.vue';
import EmployeesTable from '../layouts/components/EmployeesTable.vue';

const axios = inject('axios')
const toast = inject('toast')
const userStore = useUserStore()

const isTableLoading = ref(true)
const tableLength = ref(1)
const users = ref([])
const userBeingEdited = ref(null)
const isDialogVisible = ref(false)
const isDialogLoading = ref(false)
const confirmDialog = ref(null)

const loadUsers = async (page) => {
  //Only shows loading on the first load (ex. Save/Edit/Del a user won't show a loading)
  if (users == [])
    isTableLoading.value = true

  await userStore.loadAllUsers(page).then((res) => {
    users.value = res.data.data
    tableLength.value = res.data.meta.last_page || 1;

    //Fetch employees photos and store the url
    users.value.forEach(async (user, index) => {
      users.value[index].photo = await userStore.fetchEmployeePhoto(user)
    })

    isTableLoading.value = false
  }).catch((error) => {
    console.log(error)
    toast.error(error.message)
  })
}

const saveEmployee = async (user, operation) => {
  isDialogLoading.value = true
  if (operation === 'create') {
    user.password = "123" //HARDCODED Password
    await axios.post('users', user).then(async (res) => {
      await loadUsers()
      toast.success(`Employee ${res.data.data.name} created successfully!`)
      closeDialog()
    }).catch((error) => {
      console.log(error)
      toast.error(error.response.data.message ? error.response.data.message : error.message)
    })
  } else {
    await axios.put(`users/${user.id}`, user).then(async (res) => {
      await loadUsers()
      toast.success(`Employee ${res.data.data.name} updated successfully!`)
      closeDialog()
    }).catch((error) => {
      console.log(error)
      toast.error(error.response.data.message ? error.response.data.message : error.message)
    })
  }
  isDialogLoading.value = false
}

const clickEdit = (user) => {
  userBeingEdited.value = { ...user }
  isDialogVisible.value = true
}

const clickDelete = async (user) => {
  if (await confirmDialog.value.open({ message: "Are you sure you want to delete this employee?" })) {
    await axios.delete(`users/${user.id}`).then(async () => {
      await loadUsers()
      toast.success("Employee removed successfully!")
      confirmDialog.value.close()
    }).catch((error) => {
      console.log(error)
      toast.error(error.response.data.message ? error.response.data.message : error.message)
    })
  }
}

const closeDialog = () => {
  userBeingEdited.value = null
  isDialogVisible.value = false
}

onMounted(() => {
  loadUsers()
})

const next = (page) => {
  loadUsers(page);
}
</script>

<template>
  <VCol cols="12">
    <EmployeesTable :employees="users" @edit="clickEdit" @delete="clickDelete" @newPage="next"
      :isTableLoading="isTableLoading" :tableLength="tableLength" @addNew="(isDialogVisible = true)" />
  </VCol>

  <VDialog v-model="isDialogVisible" max-width="625" persistent>
    <UserDetailsDialog :user="userBeingEdited" @close="closeDialog" @save="saveEmployee" :isLoading="isDialogLoading" />
  </VDialog>

  <ConfirmationDialog ref="confirmDialog" />
</template>