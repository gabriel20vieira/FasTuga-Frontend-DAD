<script setup>
import { useUserStore } from "@/stores/user";
import { VerticalNavLayout } from '@layouts';
import { getComputedNavLinkToProp } from '@layouts/utils';
import DrawerContent from './DrawerContent.vue';

// Components
import Footer from '@/layouts/components/Footer.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import UserProfile from '@/layouts/components/UserProfile.vue';

const userStore = useUserStore()
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar>

      <VSpacer />

      <Component v-show="userStore.isAnonymous" is="RouterLink" v-bind="getComputedNavLinkToProp({ to: 'login' })" style="color: rgb(var(--v-theme-default)) !important">
        <VBtn variant="text" color="default">
          <VIcon icon="mdi-login" size="24" class="mr-2" />
          Login
        </VBtn>
      </Component>

      <NavbarThemeSwitcher class="me-2" />

      <UserProfile v-if="userStore.isLogged" />
    </template>

    <!-- 👉 Drawer content -->
    <template #navigation-drawer-content>
      <DrawerContent />
    </template>

    <!-- 👉 Pages -->
    <div class="layout-page-content">
      <RouterView />
    </div>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss">
.app-bar-search {
  .v-input__control {
    width: 236px
  }

  .v-field__outline__start {
    border-radius: 28px 0 0 28px !important;
    flex-basis: 20px !important;
  }

  .v-field__outline__end {
    border-radius: 0 28px 28px 0 !important;
  }
}
</style>
