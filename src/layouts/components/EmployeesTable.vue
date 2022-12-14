<script setup>
import defaultAvatar from "@/assets/images/avatars/avatar-2.png";
import { arrayNbrPages, arrayPaginate } from "@/utils/pagination";
import { CHEF, CUSTOMER, DELIVERY, MANAGER, userRole } from "@/utils/utils";
import { ref } from "vue";
import TablePagination from "../components/TablePagination.vue";

const props = defineProps({
  employees: {
    type: Array,
    default: () => [],
  },
  showId: {
    type: Boolean,
    default: false,
  },
  showEmail: {
    type: Boolean,
    default: true,
  },
  showRole: {
    type: Boolean,
    default: true,
  },
  showPhoto: {
    type: Boolean,
    default: true,
  },
  showEditButton: {
    type: Boolean,
    default: true,
  },
  showDeleteButton: {
    type: Boolean,
    default: true,
  },
  isTableLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["edit", "delete"]);

const editClick = (user) => {
  emit("edit", user);
};

const deleteClick = (user) => {
  emit("delete", user);
};

const currentPage = ref(1)
const clickNewTablePage = (page) => {
  currentPage.value = page
}

const roleIcon = (role) => {
  switch (role) {
    case MANAGER: return 'mdi-tie'
    case DELIVERY: return 'mdi-cash-register'
    case CHEF: return 'mdi-chef-hat'
    default: return 'mdi-food-fork-drink'
  }
}

const serverBaseUrl = inject("serverBaseUrl")
const photoFullUrl = (user) => {
  return user.photo_url
    ? serverBaseUrl + "/storage/fotos/" + user.photo_url
    : defaultAvatar
}
</script>

<template>
  <VDivider />
  <VProgressLinear :active="props.isTableLoading" indeterminate />
  <VTable>
    <thead>
      <tr>
        <th v-if="showId" class="text-uppercase">
          #
        </th>
        <th class="text-uppercase">
          Name
        </th>
        <th v-if="showEmail" class="text-uppercase">
          E-mail
        </th>
        <th v-if="showRole" class="text-uppercase">
          Role
        </th>
        <th v-if="showEditButton" class="text-uppercase text-center">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(employee, index) in arrayPaginate(employees, currentPage)" :key="employee.id">
        <td v-if="showId">{{ employee.id }}</td>
        <td>
          <div class="left"><img :src="photoFullUrl(employee)" class="rounded-circle img_photo" width="35" height="35"
              style="margin-top: 5px;" /></div>
          <div class="right">{{ employee.name }}</div>
        </td>
        <td v-if="showEmail">{{ employee.email }}</td>
        <td v-if="showRole">
          <VChip>
            <VIcon :icon="roleIcon(employee.type)" size="15" class="mr-2" />
            <span>{{ userRole(employee.type) }}</span>
          </VChip>
        </td>
        <td v-if="showEditButton" style="text-align: -webkit-center;">
          <div style="display: table-cell">
            <VBtn icon variant="text" @click="editClick(employee)" v-if="showEditButton" width="30px" height="30px">
              <VIcon icon="mdi-pencil" size="18" />
              <VTooltip activator="parent" location="end">
                Edit
              </VTooltip>
            </VBtn>
          </div>
          <div style="display: table-cell" v-if="(employee.type != CUSTOMER)">
            <VBtn icon variant="text" @click="deleteClick(employee)" v-if="showEditButton" width="30px" height="30px">
              <VIcon icon="mdi-trash" size="18" />
              <VTooltip activator="parent" location="end">
                Delete
              </VTooltip>
            </VBtn>
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
  <VDivider />
  <TablePagination @newPage="clickNewTablePage" :tableLength="arrayNbrPages(employees)"
    :isTableLoading="props.isTableLoading" />
</template>

<style scoped>
.left {
  display: table-cell;
}

.right {
  display: table-cell;
  vertical-align: middle;
  padding-left: 15px;
}

.table-header {
  display: flex;
}

.table-title {
  flex: auto;
}
</style>