<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/ambient'
import { computed } from 'vue'

const route = useRoute()
const productStore = useProductStore()
const product = computed<Product | undefined>(() =>
  productStore.products.find((p) => p.$id === route.params.productid)
)
</script>
<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
  </div>
  <div class="h-60 text-xl" v-else>Product not found</div>
</template>
