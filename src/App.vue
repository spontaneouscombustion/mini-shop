<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAccountStore } from './stores/account'
import { useRouter, useRoute } from 'vue-router'
import FooterComponent from './components/FooterComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'

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
  <NavbarComponent :user="account.user" @clearSession="clearSession" />
  <div class="flex justify-center">
    <div class="w-full px-2 py-4 md:w-1/2">
      <RouterView />
    </div>
  </div>
  <FooterComponent />
</template>
