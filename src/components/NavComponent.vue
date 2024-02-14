<script lang="ts" setup>
withDefaults(
  defineProps<{
    isAuthenticated: boolean
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
    <div class="flex justify-center px-4 border-b">
      <div class="w-full md:w-1/2 flex justify-between items-center py-4">
        <RouterLink class="text-xl" :to="{ name: 'home' }"> App Name </RouterLink>
        <div class="flex gap-3 items-center">
          <template v-if="isAuthenticated">
            <button type="button" @click="$emit('clearSession')">Logout</button>
          </template>
          <template v-else>
            <RouterLink class="" :to="{ name: 'login' }">Login</RouterLink>
            <RouterLink class="p-3 rounded-lg bg-blue-600 text-blue-200" :to="{ name: 'register' }"
              >Register</RouterLink
            >
          </template>
        </div>
      </div>
    </div>
    <div></div>
  </nav>
</template>
