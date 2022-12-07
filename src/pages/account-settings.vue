<script setup>
import { useUserStore } from '@/stores/user';
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue';
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const activeTab = ref(route.params.tab)
const userStore = useUserStore()

// tabs
const tabs = [
  {
    title: 'Account',
    icon: 'mdi-account-cog-outline',
    tab: 'account',
  },
  {
    title: 'Security',
    icon: 'mdi-lock-open-outline',
    tab: 'security',
  }
]
</script>

<template>
  <div>
    <VTabs v-model="activeTab" show-arrows>
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition" :touch="false">
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccount />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity />
      </VWindowItem>


    </VWindow>
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: pages-account-settings-tab
</route>
