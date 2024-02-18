<script lang="ts" setup>
import type { Attributes, Product } from '@/ambient'
import { ref } from 'vue'

defineProps<{
  product: Product
  attributes: Attributes
}>()

function getCheapestPrice(attributes: Attributes): number {
  if (attributes.length === 0) {
    return 0
  }
  const sorted = attributes.sort((a, b) => a.price - b.price)
  return sorted[0].price
}

const currency = ref<string>(import.meta.env.VITE_DEFAULT_CURRENCY)
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <figure class="h-48 overflow-hidden">
      <img
        class="object-fill object-center"
        :src="product.photos[0] ?? 'https://placehold.co/600x400'"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <div class="card-actions items-center justify-between">
        <h3 class="text-lg text-primary">{{ currency }} {{ getCheapestPrice(attributes) }}</h3>
        <router-link
          :to="{ name: 'productview', params: { productid: product.$id } }"
          class="btn btn-primary"
          >Buy Now</router-link
        >
      </div>
    </div>
  </div>
</template>
