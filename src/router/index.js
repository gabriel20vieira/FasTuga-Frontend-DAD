import { useUserStore } from '@/stores/user'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
  scrollBehavior() {
    return { top: 0 }
  },
})

const redirectOnUnauthorized = '/404'
const authorization = {
  login: store => store.isAnonymous,
  register: store => store.isAnonymous,
  menu: store => store.isAnonymous || store.isCustomer,
  'manage-menu': store => store.isManager,
  statistics: store => store.isManager,
  users: store => store.isManager,
  dashboard: store => store.isManager,
  'account-settings': store => store.isLogged,
}

router.beforeEach(async to => {
  const userStore = useUserStore()
  await userStore.restoreToken()

  let condition = authorization[to.name]
  if (condition && condition(userStore) == false) {
    return redirectOnUnauthorized
  }
})

export default router
