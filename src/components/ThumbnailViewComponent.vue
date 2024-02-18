<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Product, Products, Attributes } from '@/ambient'
const props = defineProps<{
  items: Products
  limit: number
  attributes: Attributes
}>()
const offset = ref<number>(0)
const productPage = computed<Products>(() => {
  return props.items.slice(offset.value, offset.value + props.limit)
})

const activePageNumber = ref<number>(1)

function setPage(n: number): void {
  activePageNumber.value = n
  offset.value = props.limit * (n - 1)
}

function getMinPrice(product: Product): number {
  const productAttributes = props.attributes.filter((a) => a.product.$id === product.$id)
  if (productAttributes.length === 1) {
    return productAttributes[0].price
  } else if (productAttributes.length > 1) {
    return productAttributes.sort((a, b) => a.price - b.price)[0].price
  } else {
    return 0
  }
}

function countStock(product: Product): number {
  const productAttributes = props.attributes.filter((a) => a.product.$id === product.$id)
  return productAttributes.reduce((pv, cv) => (pv += cv.stock), 0)
}
</script>

<template>
  <ul class="grid grid-cols-2 gap-3 px-2 py-4 md:grid-cols-3">
    <li
      v-for="product in productPage"
      :key="product.$id"
      class="relative h-48 bg-cover bg-center bg-no-repeat drop-shadow"
      :style="{
        backgroundImage: `url(${product.photos[0] ?? 'https://placehold.co/600x400'})`
      }"
    >
      <div class="absolute top-0 flex w-full justify-between p-1 text-sm">
        <span class="rounded bg-slate-800 p-1 text-slate-100">{{ countStock(product) }} Items</span>
        <span class="rounded bg-orange-700 p-1 text-orange-200"
          >&#x20B1;{{ getMinPrice(product) }}</span
        >
      </div>
      <div
        class="absolute bottom-0 h-12 w-full opacity-80"
        :class="countStock(product) > 0 ? 'bg-green-900 ' : 'bg-red-900'"
      ></div>
      <div class="absolute bottom-0 flex h-12 w-full items-center justify-between p-1">
        <p class="truncate text-sm text-white" v-text="product.name"></p>
        <button class="rounded-full p-1 text-green-200 hover:bg-green-800 hover:text-green-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 fill-current" viewBox="0 0 16 16">
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
            />
          </svg>
        </button>
      </div>
    </li>
  </ul>
  <div class="flex gap-1 px-2 py-3">
    <button
      class="rounded border bg-slate-200 p-2"
      v-for="n in Math.ceil(items.length / limit)"
      :key="n"
      :class="{ 'border bg-slate-300 font-semibold': n === activePageNumber }"
      @click="setPage(n)"
    >
      {{ n }}
    </button>
  </div>
</template>
