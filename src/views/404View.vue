<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="flex h-80 flex-col items-center justify-center">
    <h1 class="text-3xl font-semibold">404</h1>
    <p class="text-xl text-slate-600">Page not found</p>
    <button type="button" @click="router.back()" class="p-2 underline">Go back</button>
  </div>
</template>
