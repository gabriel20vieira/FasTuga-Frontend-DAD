<script setup>
import { useUsersStore } from '@/stores/users';
import { inject, onMounted, ref } from 'vue';
import ConfirmationDialog from '../layouts/components/ConfirmationDialog.vue';
import UserDetailsDialog from '../layouts/components/EmployeeDialog.vue';
import EmployeesTable from '../layouts/components/EmployeesTable.vue';

const toast = inject('toast')
const usersStore = useUsersStore()

const isTableLoading = ref(true)
const tableLength = ref(1)
const userBeingEdited = ref(null)
const isDialogVisible = ref(false)
const isDialogLoading = ref(false)
const confirmDialog = ref(null)
const customersFilter = ref(false)

const loadUsers = async () => {
  isTableLoading.value = true

  await usersStore.fetchAllUsers().then(() => {
    isTableLoading.value = false
  }).catch((error) => {
    toast.error(error.message)
  })
}

const saveEmployee = async (user, operation) => {
  isDialogLoading.value = true
  if (operation === 'create') {
    user.password = "12345678" //HARDCODED Password
    user.password_confirmation = "12345678" //HARDCODED Password
    await usersStore.createEmployee(user).then(() => {
      toast.success(`Employee ${user.name} created successfully!`)
      closeDialog()
    }).catch((error) => {
      return toast.error(error.response.data.message ? error.response.data.message : error.message)
    })
  } else {
    await usersStore.editEmployee(user).then(() => {
      toast.success(`Employee ${user.name} updated successfully!`)
      closeDialog()
    }).catch((error) => {
      return toast.error(error.response.data.message ? error.response.data.message : error.message)
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
    await usersStore.deleteEmployee(user).then(() => {
      toast.success("Employee removed successfully!")
      confirmDialog.value.close()
    }).catch((error) => {
      toast.error(error.response.data.message ? error.response.data.message : error.message)
    })
  }
}

const openDialog = () => {
  isDialogVisible.value = true
  customersFilter.value = false //Switches to employees only table when creating new employee
}

const closeDialog = () => {
  userBeingEdited.value = null
  isDialogVisible.value = false
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <VCol cols="12">
    <VCard cols="12">
      <VCardText class="pt-4 pb-2">
        <VCardTitle class="pa-0 table-header">
          <VCardTitle class="pl-0 pt-1 table-title">Users</VCardTitle>
          <VSwitch v-model="customersFilter" label="Show Customers" class="pr-8" />
          <VBtn class="pl-4" @click="openDialog">
            <VIcon icon="mdi-add" size="18" class="mr-1" />
            Add Employee
          </VBtn>
        </VCardTitle>
      </VCardText>

      <EmployeesTable :employees="customersFilter ? usersStore.getCustomers : usersStore.getEmployees" @edit="clickEdit"
        @delete="clickDelete" :isTableLoading="isTableLoading" />
    </VCard>
  </VCol>

  <VDialog v-model="isDialogVisible" max-width="625" persistent>
    <UserDetailsDialog :user="userBeingEdited" @close="closeDialog" @save="saveEmployee" :isLoading="isDialogLoading" />
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