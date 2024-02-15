import { type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
export default <RouteRecordRaw[]>[
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'register',
    component: () => import('@/views/auth/SignupView.vue')
  },
  {
    path: '/admin',
    children: [
      {
        path: '',
        name: 'adminoverview',
        component: () => import('@/views/admin/OverviewView.vue')
      },
      {
        path: '/admin/products',
        name: 'adminproducts',
        component: () => import('@/views/admin/ProductView.vue')
      }
    ],
    meta: {
      requiresAuth: true,
      adminOnly: true
    }
  },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: import('@/views/404View.vue') },
]
