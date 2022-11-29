<script setup>
import { userRole } from "@/utils/utils";
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

const emit = defineEmits(["edit", "delete", "newPage"]);

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
</script>

<template>
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
        <td v-if="showRole">{{ userRole(employee.type) }}</td>
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
</template>

<style lang="scss">
.left {
  display: table-cell;
}

.right {
  display: table-cell;
  vertical-align: middle;
  padding-left: 15px;
}
</style>