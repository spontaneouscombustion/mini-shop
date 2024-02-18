<script lang="ts" setup>
import type { Attributes, Product } from '@/ambient'

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
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img :src="product.photos[0] ?? 'https://placehold.co/600x400'" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <div class="card-actions justify-end">
        <router-link :to="{ name: 'productview', params: { productid: product.$id } }" class="btn btn-primary">Buy Now</router-link>
      </div>
    </div>
  </div>
</template>
