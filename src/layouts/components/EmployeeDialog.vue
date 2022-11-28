<script setup>
import defaultAvatar from "@/assets/images/avatars/avatar-8.png";
import { uploadImage } from "@/utils/utils";
import { emailRules, nameRules } from '@/utils/validations';
import { computed } from "@vue/reactivity";
import { onUnmounted } from "vue";
import ConfirmationDialog from "./ConfirmationDialog.vue";

const form = ref(null)
const roles = [{ type: "EC", title: "Chef" }, { type: "ED", title: "Delivery" }, { type: "EM", title: "Manager" }, { type: "C", title: "Customer" }]
const confirmDialog = ref(null)
const refInputEl = ref()
const employeePhoto = ref(defaultAvatar)

const user = ref({
  name: '',
  email: '',
  type: 'ED',
  blocked: 0,
  photo_url: ''
})

const props = defineProps({
  user: {
    type: Object
  }
})

const emit = defineEmits(["close", "save"]);
const closeClick = async () => {
  if (!newData.value) //Changes occured
    return emit("close");

  if (await confirmDialog.value.open({ message: "Do you really want to leave? You have unsaved changes!" })) {
    return emit("close");
  }
};

const saveClick = async (user) => {
  if (!newData.value)
    return emit("close");

  const validation = await form.value.validate();
  if (validation.valid) {
    emit("save", user, operation.value);
  }
};

const clickUploadImage = (file) => {
  const fileReader = uploadImage(file)
  fileReader.onload = () => {
    if (typeof fileReader.result === 'string' && fileReader.result.includes("image/"))
      employeePhoto.value = fileReader.result
  }
}


const newData = computed(() => {
  return operation.value === 'create' ?
    user.value.name != '' || user.value.email != '' :
    JSON.stringify(user.value) != JSON.stringify(props.user) || employeePhoto.value != defaultAvatar
})

const operation = computed(() => (!props.user) ? 'create' : 'update')

const dialogTitle = computed(() => operation.value === 'create' ? 'New Employee' : 'Update Employee')

onMounted(() => {
  //if a user was passed (edit user) it populates de fields, else (new user) keeps the default + empty values
  if (props.user)
    user.value = { ...props.user }
})

onUnmounted(() => {
  emit("close");
})
</script>

<template>
  <VCard :title="dialogTitle" class="profile-view">
    <VCardText>
      <VRow>
        <VCol style="position:relative">
          <VAvatar rounded color="primary" size="192" variant="tonal" :image="employeePhoto" />
          <VBtn color="secondary" icon="mdi-upload" class="photo-upload-btn" @click="refInputEl?.click()" />
          <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg" hidden @input="clickUploadImage">
        </VCol>
        <VCol xs="12" sm="7" lg="7" xl="7" class="pt-0">
          <VForm ref="form" @submit.prevent="() => { }">
            <VCol class="pl-0 pr-0">
              <VTextField v-model="user.name" label="Name" prepend-inner-icon="mdi-account-outline" :rules="nameRules"
                required />
            </VCol>
            <VCol class="pl-0 pr-0">
              <VTextField v-model="user.email" label="E-mail" type="email" prepend-inner-icon="mdi-email-outline"
                :rules="emailRules" required />
            </VCol>
            <VCol class="pl-0 pr-0">
              <VSelect v-model="user.type" :items="roles" item-value="type" item-text="title" label="Role"
                prepend-inner-icon="mdi-account-cog-outline" required />
            </VCol>
          </VForm>
        </VCol>
      </VRow>
    </VCardText>
    <VCardActions class="pr-5">
      <VSwitch v-model="user.blocked" label="Block Account" class="pl-3" :true-value="1" :false-value="0" />
      <VSpacer />
      <VBtn color="on-secondary" variant="outlined" @click="closeClick">
        Close
      </VBtn>
      <VBtn color="primary" variant="flat" @click="saveClick(user)" :disabled="!newData">
        Save
      </VBtn>
    </VCardActions>
  </VCard>

  <ConfirmationDialog ref="confirmDialog" />
</template>

<style>
.profile-view .photo-upload-btn {
  position: absolute;
  top: 163px !important;
  bottom: 0px !important;
  right: 41px;
  left: 168px;
}
</style>