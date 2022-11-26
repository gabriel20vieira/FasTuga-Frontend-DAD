<script setup>
import avatarNoneUrl from "../../assets/images/avatars/avatar-5.png";

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
})

const emit = defineEmits(["edit"]);

const editClick = (user) => {
  emit("edit", user);
};

const deleteClick = (user) => {
  emit("delete", user);
};

const photoFullUrl = (employee) => {
  return avatarNoneUrl;
};

const userRole = (role) => {
  switch (role) {
    case "EC":
      return "Chef";
    case "ED":
      return "Delivery";
    case "EM":
      return "Manager";
    default:
      return "Employee";
  }
}
</script>

<template>
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
        <th v-if="showEditButton" class="text-uppercase">
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
        <td v-if="showEditButton">
          <div style="display: table-cell">
            <VBtn icon variant="text" @click="editClick(employee)" v-if="showEditButton" width="30px" height="30px">
              <VIcon icon="mdi-pencil" size="18"/>
              <VTooltip activator="parent" location="end">
                Edit
              </VTooltip>
            </VBtn>
          </div>
          <div style="display: table-cell">
            <VBtn icon variant="text" @click="deleteClick(employee)" v-if="showEditButton" width="30px" height="30px">
              <VIcon icon="mdi-trash" size="18"/>
              <VTooltip activator="parent" location="end">
                Delete
              </VTooltip>
            </VBtn>
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
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