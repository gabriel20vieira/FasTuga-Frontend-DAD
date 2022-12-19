<script setup>
import AccountSettingsAccount from '@/layouts/components/AccountSettingsAccount.vue';
import AccountSettingsSecurity from '@/layouts/components/AccountSettingsSecurity.vue';
import AccountSettingsStatistics from '@/layouts/components/AccountSettingsStatistics.vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';

const userStore = useUserStore()
const route = useRoute()
const activeTab = ref(route.params.tab)


const tabs = [
	{
		title: 'Account',
		icon: 'mdi-account-outline',
		tab: 'account',
	},
	{
		title: 'Security',
		icon: 'mdi-lock-outline',
		tab: 'security',
	}
]

if (!userStore.isManager) {
	tabs.push({
		title: 'Statistics',
		icon: 'mdi-chart-timeline-variant',
		tab: 'statistics'
	})
}
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
				<AccountSettingsAccount />
			</VWindowItem>

			<VWindowItem value="security">
				<AccountSettingsSecurity />
			</VWindowItem>

			<VWindowItem value="statistics" v-if="!userStore.isManager">
				<AccountSettingsStatistics />
			</VWindowItem>
		</VWindow>
	</div>
</template>

<route lang="yaml">
meta:
  navActiveLink: pages-account-settings-tab
</route>
