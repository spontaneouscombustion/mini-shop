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
  <li class="flex h-48 flex-row">
    <div class="h-full w-2/5 bg-gray-300">
      <div
        class="h-full w-full bg-contain bg-center bg-no-repeat"
        :style="{
          backgroundImage: `url(${product.photos[0] ?? 'https://placehold.co/600x400'})`
        }"
      ></div>
    </div>
    <div class="flex flex-col justify-between px-2 py-4">
      <div>
        <h3 class="pb-4 text-2xl">
          <router-link
            :to="{
              name: 'productview',
              params: {
                productid: product.$id
              }
            }"
            >{{ product.name }}</router-link
          >
        </h3>
        <p class="text-sm text-slate-500">{{ product.description }}</p>
      </div>
      <div>
        <span class="text-2xl">&#x20B1;{{ getCheapestPrice(attributes) }}</span>
      </div>
    </div>
  </li>
</template>
