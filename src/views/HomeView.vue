<script setup lang="ts">
import { computed } from 'vue'
import type { Products, Product, Attributes } from '@/ambient'
import { useProductStore } from '@/stores/product'
import ProductListItemComponent from '@/components/ProductListItemComponent.vue'
const productStore = useProductStore()
const productActive = computed<Products>(() => {
  return productStore.attributes.reduce((pv: Products, cv) => {
    if (!pv.find((p) => p.$id === cv.product.$id && cv.stock > 0)) {
      pv.push(cv.product)
    }
    return pv
  }, [])
})

function getProductAttribute(product: Product): Attributes {
  return productStore.attributes.filter((a) => product.$id === a.product.$id)
}
</script>

<template>
  <div class="pt-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <ProductListItemComponent
        v-for="product in productActive"
        :key="product.$id"
        :product="product"
        :attributes="getProductAttribute(product)"
      />
    </div>
  </div>
</template>
