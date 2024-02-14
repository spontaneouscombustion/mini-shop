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

function countStock(product: Product): number {
  const productAttributes = props.attributes.filter((a) => a.product.$id === product.$id)
  return productAttributes.reduce((pv, cv) => (pv += cv.stock), 0)
}
</script>

<template>
  <ul class="grid grid-cols-2 md:grid-cols-3 gap-3 py-4 px-2">
    <li
      v-for="product in productPage"
      :key="product.$id"
      class="relative h-48 bg-cover bg-no-repeat bg-center drop-shadow"
      :style="{
        backgroundImage: `url(${product.photos[0] ?? 'https://placehold.co/600x400'})`
      }"
    >
      <div class="absolute top-0 p-1 flex justify-between text-sm w-full">
        <span class="p-1 rounded bg-slate-800 text-slate-100">{{ countStock(product) }} Items</span>
        <span class="p-1 rounded bg-orange-700 text-orange-200">&#x20B1;200</span>
      </div>
      <div
        class="absolute bottom-0 w-full h-12 opacity-80"
        :class="countStock(product) > 0 ? 'bg-green-900 ' : 'bg-red-900'"
      ></div>
      <div class="absolute bottom-0 w-full h-12 flex items-center justify-between p-1">
        <p class="text-sm text-white truncate" v-text="product.name"></p>
        <button class="text-green-200 hover:bg-green-800 hover:text-green-200 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current h-5" viewBox="0 0 16 16">
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
            />
          </svg>
        </button>
      </div>
    </li>
  </ul>
  <div class="flex gap-1 py-3 px-2">
    <button
      class="p-2 rounded bg-slate-200 border"
      v-for="n in Math.ceil(items.length / limit)"
      :key="n"
      :class="{ 'border font-semibold bg-slate-300': n === activePageNumber }"
      @click="setPage(n)"
    >
      {{ n }}
    </button>
  </div>
</template>
