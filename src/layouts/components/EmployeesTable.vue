<script setup>
import { CHEF, DELIVERY, MANAGER, userRole } from "@/utils/utils";
import avatarNoneUrl from "../../assets/images/avatars/avatar-5.png";
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
  tableLength: {
    type: Number,
    default: 1,
  }
})

const emit = defineEmits(["edit", "delete", "newPage", "addNew"]);

const editClick = (user) => {
  emit("edit", user);
};

const deleteClick = (user) => {
  emit("delete", user);
};

const photoFullUrl = (employee) => {
  return avatarNoneUrl;
};

const clickNewTablePage = (page) => {
  emit("newPage", page);
}

const roleIcon = (role) => {
  switch (role) {
    case MANAGER: return 'mdi-tie'
    case DELIVERY: return 'mdi-cash-register'
    case CHEF: return 'mdi-chef-hat'
    default: return 'mdi-food-fork-drink'
  }
}

const clickAddNew = () => {
  emit("addNew")
}

</script>

<template>
  <VCard cols="12">

    <VCardText class="pt-4 pb-2">
      <VCardTitle class="pa-0 table-header">
        <VCardTitle class="pl-0 pt-1 table-title">Employees</VCardTitle>
        <VBtn class="pl-4" @click="clickAddNew">
          <VIcon icon="mdi-add" size="18" class="mr-1" />
          Add Employee
        </VBtn>
      </VCardTitle>
    </VCardText>

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
        <tr v-for="employee in employees" :key="employee.id">
          <td v-if="showId">{{ employee.id }}</td>
          <td>
            <div class="left"><img :src="photoFullUrl(employee)" class="rounded-circle img_photo" width="35"
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
            <div style="display: table-cell">
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
    <TablePagination @newPage="clickNewTablePage" :tableLength="props.tableLength"
      :isTableLoading="props.isTableLoading" />
  </VCard>
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