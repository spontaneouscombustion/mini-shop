import { createRouter, createWebHistory, type Router } from 'vue-router'
import guard from './guard'
import routes from './routes'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(guard)

export default router
