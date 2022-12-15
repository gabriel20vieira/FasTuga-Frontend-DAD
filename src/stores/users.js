import { CUSTOMER } from '@/utils/utils'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const axios = inject('axios')
  const users = ref([])

  const totalUsers = computed(() => {
    return users.value.length
  })

  const getCustomers = computed(() => {
    return users.value.filter(user => user.type == CUSTOMER)
  })

  const getEmployees = computed(() => {
    return users.value.filter(user => user.type != CUSTOMER)
  })

  function clearUsers() {
    users.value = []
  }

  async function fetchAllUsers() {
    try {
      const response = await axios.get('users?size=9999')
      users.value = response.data.data
      return users.value
    } catch (error) {
      clearUsers()
      throw error
    }
  }

  async function fetchUser(id) {
    try {
      const response = await axios.get(`users/${id}`)
      return response.data.data
    } catch (error) {
      throw error
    }
  }

  async function createEmployee(employee) {
    const response = await axios.post('users', employee)
    users.value.unshift(response.data.data) //Adds employee to the beginning of the array
    return response.data.data
  }

  async function editEmployee(employee) {
    const response = await axios.put(`users/${employee.id}`, employee)
    let idx = users.value.findIndex(user => user.id === response.data.data.id)
    if (idx >= 0) {
      users.value[idx] = response.data.data
    }
    return response.data.data
  }

  async function deleteEmployee(employee) {
    const response = await axios.delete(`users/${employee.id}`)
    let idx = users.value.findIndex(user => user.id === response.data.data.id)
    if (idx >= 0) {
      users.value.splice(idx, 1)
    }
    return response.data.data
  }

  return {
    fetchAllUsers,
    getEmployees,
    getCustomers,
    createEmployee,
    editEmployee,
    deleteEmployee,
    fetchUser,
  }
})
