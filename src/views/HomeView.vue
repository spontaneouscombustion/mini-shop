<script setup lang="ts">
import { computed } from 'vue'
import type { Products, Product } from '@/ambient'
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()
const productActive = computed<Products>(() => {
  return productStore.attributes.reduce((pv: Products, cv) => {
    if (!pv.find((p) => p.$id === cv.product.$id && cv.stock > 0)) {
      pv.push(cv.product)
    }
    return pv
  }, [])
})

function getProductPrice(product: Product): number {
  const productAttributes = productStore.attributes.filter((a) => product.$id === a.product.$id)
  if (productAttributes.length === 1) {
    return productAttributes[0].price
  }
  return productAttributes.sort((a, b) => a.price - b.price)[0].price
}
</script>

<template>
  <div class="">
    <h2 class="font-semibold text-2xl">Flash Sale</h2>
    <div class="bg-slate-50">
      <ul class="grid grid-cols-2 md:grid-cols-4 p-2">
        <li v-for="product in productActive" :key="product.$id" class="relative h-48 hover:border">
          {{ product.name }}
          &#x20B1;{{ getProductPrice(product) }}
        </li>
      </ul>
    </div>
  </div>
</template>
