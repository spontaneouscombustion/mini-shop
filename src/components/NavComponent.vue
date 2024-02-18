<script lang="ts" setup>
import type { AppUser } from '@/ambient'

withDefaults(
  defineProps<{
    isAuthenticated: boolean
    user: AppUser | undefined
  }>(),
  {
    isAuthenticated: false
  }
)
defineEmits<{
  (e: 'clearSession'): void
}>()
</script>

<template>
  <nav class="bg-white font-semibold">
    <div class="flex justify-center border-b px-4">
      <div class="flex w-full items-center justify-between py-4 md:w-1/2">
        <RouterLink class="text-xl" :to="{ name: 'home' }"> App Name </RouterLink>
        <div class="flex items-center gap-3">
          <button type="button" class="text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 fill-current" viewBox="0 0 16 16">
              <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
              />
            </svg>
          </button>
          <template v-if="isAuthenticated && user">
            <div class="relative">
              <button class="h-9 w-9 overflow-hidden rounded-full" type="button">
                <img
                  class="h-full w-full object-cover object-center"
                  :src="`https://gravatar.com/avatar/${user.avatar}`"
                />
              </button>
              <div class="absolute right-0 top-12 min-w-64">
                <ul class="w-full divide-x rounded-md bg-slate-50 drop-shadow-md">
                  <li class="hover:bg-slate-300">
                    <a class="inline-block p-2" href="somewhere">Somewhere</a>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-else>
            <RouterLink class="" :to="{ name: 'login' }">Login</RouterLink>
            <RouterLink class="rounded-lg bg-blue-600 p-3 text-blue-200" :to="{ name: 'register' }"
              >Register</RouterLink
            >
          </template>
        </div>
      </div>
    </div>
    <div></div>
  </nav>
</template>
