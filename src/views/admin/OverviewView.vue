<script setup lang="ts">
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()
</script>

<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="">Dashboard</h1>
      <div>
        <select>
          <option selected>Last 7 Days</option>
          <option>Last 2 Weeks</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 py-2 divide-x divide-y md:divide-y">
      <div class="bg-slate-700 text-slate-200 border drop-shadow-sm p-2">
        <h2 class="text-3xl">{{ productStore.products.length }}</h2>
        <p><router-link :to="{ name: 'adminproducts' }">Products</router-link></p>
      </div>
      <div class="bg-slate-700 text-slate-200 border drop-shadow-sm p-2">
        <h2 class="text-3xl">24</h2>
        <p>Orders</p>
      </div>
      <div class="bg-slate-700 text-slate-200 border drop-shadow-sm p-2">
        <h2 class="text-3xl">7</h2>
        <p>Shipping</p>
      </div>
      <div class="bg-slate-700 text-slate-200 border drop-shadow-sm p-2">
        <h2 class="text-3xl">8</h2>
        <p>Pending</p>
      </div>
    </div>
  </div>
</template>
