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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.name == 'index') {
    return next()
  }

  switch (to.name) {
    case 'login':
    case 'register':
      if (userStore.isLogged) {
        return next({ name: 'index' })
      }
    case 'statistics':
      if (userStore.isCustomer) {
        return next({ name: 'index' })
      }
    case 'menu':
      if (!userStore.isAnonymous && !userStore.isCustomer) {
        return next({ name: 'index' })
      }
    default:
      return next()
  }
})

export default router
