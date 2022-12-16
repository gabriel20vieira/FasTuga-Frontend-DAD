<script setup>
import { useUserStore } from "@/stores/user";
import { userRole } from "@/utils/utils";

const toast = inject("toast")
const userStore = useUserStore()
const router = useRouter()

const logout = async () => {
  await userStore.logout().then((res) => {
    if (res) {
      router.push({ name: 'index' })
      toast.success("User has logged out of the application.")
    } else {
      toast.error("There was a problem logging out of the application!")
    }
  }).catch((res) => {
    toast.error("There was a problem logging out of the application!")
  })
}

const goToProfile = () => {
  router.push({ name: 'account-settings' })
}

</script>

<template>
  <VAvatar style="cursor: pointer;" color="primary" variant="tonal">
    <div class="rounded-circle overflow-hidden w-100">
      <VImg :src="userStore.userPhoto" :class="'card-avatar'" />
    </div>

    <!-- SECTION Menu -->
    <VMenu activator="parent" width="230" location="bottom end" offset="14px">
      <VList>
        <!-- 👉 User Avatar & Name -->
        <VListItem>
          <template #prepend>
            <VListItemAction start>
              <VAvatar color="primary" size="40" variant="tonal">
                <div class="rounded-circle overflow-hidden w-100">
                  <VImg :src="userStore.userPhoto" :class="'card-avatar'" />
                </div>
              </VAvatar>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ userStore.user?.name }}
          </VListItemTitle>
          <VListItemSubtitle class="text-disabled">
            {{ userRole(userStore.user?.type) }}
          </VListItemSubtitle>
        </VListItem>

        <VDivider class="my-2" />

        <!-- 👉 Profile -->
        <VListItem link @click="goToProfile">
          <template #prepend>
            <VIcon class="me-2" icon="mdi-account-outline" size="22" />
          </template>
          <VListItemTitle>Profile</VListItemTitle>
        </VListItem>

        <!-- 👉 Logout -->
        <VListItem @click="logout">
          <template #prepend>
            <VIcon class="me-2" icon="mdi-logout-variant" size="22" />
          </template>
          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VAvatar>
</template>

<style lang="scss">
.card-avatar {
  aspect-ratio: 1/1;
  object-fit: cover;
  scale: 2;
}
</style>