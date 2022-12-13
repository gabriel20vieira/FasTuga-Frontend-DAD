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

router.beforeEach(async to => {
  const userStore = useUserStore()
  await userStore.restoreToken()

  switch (to.name) {
    case 'login':
    case 'register':
      if (userStore.isLogged) {
        return '/'
      }
      break
    default:
      break
  }
})

export default router
