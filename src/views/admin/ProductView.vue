<script lang="ts" setup>
import { ref, computed, type Ref } from 'vue'
import { useProductStore } from '@/stores/product'
import type { Products } from '@/ambient'
import ThumbnailViewComponent from '@/components/ThumbnailViewComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()
const sortBy: Ref<string> = ref('name')
const orderAsc: Ref<boolean> = ref(true)

const productsSorted = computed(() => {
  const products: Products = productStore.products
  if (products.length > 0) {
    if (typeof products[0][sortBy.value] === 'number') {
      const asc = products.sort((a, b) => a[sortBy.value] - b[sortBy.value])
      if (orderAsc.value) {
        return asc
      } else {
        return asc.reverse()
      }
    } else {
      const asc = products.sort((a, b) => {
        if (typeof a[sortBy.value] !== 'string' || typeof b[sortBy.value] !== 'string') {
          throw new Error('An error has occured')
        }
        const astr: string = a[sortBy.value]
        const bstr: string = b[sortBy.value]
        const r = astr.toLowerCase() < bstr.toLowerCase()
        return r ? -1 : 1
      })
      if (orderAsc.value) {
        return asc
      } else {
        return asc.reverse()
      }
    }
  } else {
    return products
  }
})
</script>

<template>
  <div class="text-slate-500">
    <button class="p-2" type="button" @click="router.back()">Go back</button>
  </div>
  <div class="grid grid-cols-1 divide-y bg-gray-50 shadow">
    <div class="flex items-center justify-between px-2 py-4 text-xl font-semibold">
      Products
      <div class="flex gap-1">
        <button type="button" class="rounded bg-slate-400 p-2 text-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 fill-current" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path
              d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </button>
        <button type="button" class="rounded p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 fill-current" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex justify-between px-2 py-4">
      <div class="flex flex-col gap-2 md:flex-row">
        <input
          type="text"
          placeholder="Search"
          class="inline-block rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 md:inline"
        />
        <div>
          <button class="inline-block rounded border-2 p-1 text-sm" type="button">Advanced</button>
        </div>
      </div>
    </div>
    <ThumbnailViewComponent
      :items="productsSorted"
      :attributes="productStore.attributes"
      :limit="6"
    />
  </div>
</template>
