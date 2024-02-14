import { useAccountStore } from '@/stores/account'
import type { RouteLocationNormalized } from 'vue-router'

export default (to: RouteLocationNormalized) => {
  const account = useAccountStore()

  //const guestOnlyRoutes: RouteRecordName[] = ['login', 'register']

  // if (to.name && guestOnlyRoutes.includes(to.name) && account.isAuthenticated) {
  //   return { name: 'home' }
  // }

  if (to.meta.requiresAuth && !account.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }
}
