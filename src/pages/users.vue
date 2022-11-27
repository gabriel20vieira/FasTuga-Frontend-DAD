<script setup>
import { inject, onMounted, ref } from 'vue';
import ConfirmationDialog from '../layouts/components/ConfirmationDialog.vue';
import UserDetailsDialog from '../layouts/components/EmployeeDialog.vue';
import EmployeesTable from '../layouts/components/EmployeesTable.vue';

const axios = inject('axios')
const toast = inject('toast')

const isTableLoading = ref(true)
const tableLength = ref(1)
const users = ref([])
const userBeingEdited = ref(null)
const isDialogVisible = ref(false)
const confirmDialog = ref(null)

const loadUsers = (page) => {
  isTableLoading.value = true
  axios.get(`users?page=${page || 1}`).then((response) => {
    users.value = response.data.data
    isTableLoading.value = false
    tableLength.value = response.data.meta.last_page || 1;
  }).catch((error) => {
    console.log(error)
    toast.error(error.message)
  })
}

const saveEmployee = (user, operation) => {
  if (operation === 'create') {
    user.password = "123" //HARDCODED Password
    axios.post('users', user)
      .then((response) => {
        //TODO: Update Store
        toast.success("Employee created successfully!")
        closeDialog()
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message ? error.response.data.message : error.message)
      })
  } else {
    axios.put(`users/${user.id}`, user)
      .then((response) => {
        //TODO: Update Store
        toast.success("Employee updated successfully!")
        closeDialog()
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message ? error.response.data.message : error.message)
      })
  }
}

const clickEdit = (user) => {
  userBeingEdited.value = { ...user }
  isDialogVisible.value = true
}

const clickDelete = async (user) => {
  if (await confirmDialog.value.open({ message: "Are you sure you want to delete this employee?" })) {
    await axios.delete(`users/${user.id}`).then(() => {
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
  <VDialog v-model="isDialogVisible" max-width="625">
    <template #activator="{ props }">
      <VCol cols="12">
        <VCard>
          <VCardText class="pt-4 pb-2">
            <VCardTitle class="pa-0 table-header">
              <VCardTitle class="pl-0 pt-1 table-title">Employees</VCardTitle>
              <VBtn v-bind="props" class="pl-4">
                <VIcon icon="mdi-add" size="18" class="mr-1" />
                Add Employee
              </VBtn>
            </VCardTitle>
          </VCardText>

          <VDivider />
          <EmployeesTable :employees="users" @edit="clickEdit" @delete="clickDelete" @newPage="next"
            :isTableLoading="isTableLoading" :tableLength="tableLength" />
        </VCard>
      </VCol>
    </template>

    <UserDetailsDialog :user="userBeingEdited" @close="closeDialog" @save="saveEmployee" />
  </VDialog>

  <ConfirmationDialog ref="confirmDialog" />
</template>

<style scoped>
.table-header {
  display: flex;
}

.table-title {
  flex: auto;
}
</style>