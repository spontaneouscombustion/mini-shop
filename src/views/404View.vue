<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="flex flex-col h-80 items-center justify-center">
    <h1 class="text-3xl font-semibold">404</h1>
    <p class="text-xl text-slate-600">Page not found</p>
    <button type="button" @click="router.back()" class="underline p-2">Go back</button>
  </div>
</template>
