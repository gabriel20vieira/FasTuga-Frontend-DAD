<script setup>
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue';
import AccountSettingsPoints from '@/views/pages/account-settings/AccountSettingsPoints.vue';
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue';

import { useRoute } from 'vue-router';


const route = useRoute()
const activeTab = ref(route.params.tab)

const tabs = [
	{
		title: 'Account',
		icon: 'mdi-account-outline',
		tab: 'account',
	},
	{
		title: 'Settings',
		icon: 'mdi-account-cog-outline',
		tab: 'settings',
	},
	{
		title: 'Security',
		icon: 'mdi-lock-outline',
		tab: 'security',
	}
]


</script>

<template>
	<div>
		<VTabs v-model="activeTab" show-arrows>
			<VTab v-for="item in tabs" :key="item.tab" :value="item.tab">
				<VIcon size="20" start :icon="item.icon" />
				{{ item.title }}
			</VTab>
		</VTabs>
		<VDivider />

		<VWindow v-model="activeTab" class="mt-5 disable-tab-transition" :touch="false">

			<VWindowItem value="account">
				<AccountSettingsPoints />
			</VWindowItem>

			<VWindowItem value="settings">
				<AccountSettingsAccount />
			</VWindowItem>

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
