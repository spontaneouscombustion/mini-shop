<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAccountStore } from './stores/account'
import { useRouter, useRoute } from 'vue-router'
import NavComponentVue from './components/NavComponent.vue'

const account = useAccountStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  account.$subscribe((mutation, state) => {
    const guestOnlyRoutes = ['login', 'register']
    const pathname = route.name ?? false
    if (pathname && guestOnlyRoutes.includes(pathname as string) && state.user) {
      const target = (route.query.redirect ?? '/') as string
      if (target) {
        router.push({
          path: target
        })
      }
    }
  })
  account.init()
})

function clearSession() {
  account.logout().then(() => {
    router.push({ name: 'login' })
  })
}
</script>

<template>
  <div class="relative min-h-screen bg-slate-100 text-slate-700">
    <NavComponentVue
      class=""
      :isAuthenticated="account.isAuthenticated"
      @clearSession="clearSession()"
    />
    <div class="flex justify-center">
      <div class="w-full md:w-1/2 py-4 px-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>
