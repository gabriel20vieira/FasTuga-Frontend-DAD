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
  // if (to.name == 'users') {
  //   //TODO: Perguntar ao stor como ir buscar o userStore com os dados
  //   if (userStore.user.type != 'EM') {
  //     return next({ name: 'index' })
  //   }
  // }
  // if (to.name == 'User') {
  //   if (userStore.user.type == 'A' || userStore.user.id == to.params.id) {
  //     return next()
  //   }
  //   return next({ name: 'home' })
  // }
  next()
})

export default router
