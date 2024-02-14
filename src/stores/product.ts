import { defineStore } from 'pinia'
import { Databases, Query, type Models } from 'appwrite'
import type { Products, Product, Attribute, Attributes } from '@/ambient'
import client from '@/lib/appwrite'
import { ref } from 'vue'

const db = new Databases(client)

export const useProductStore = defineStore('product', () => {
  const products = ref<Products>([])
  const attributes = ref<Attributes>([])
  const totalProducts = ref(0)
  async function init() {
    const limit = 100
    const { documents, total }: Models.DocumentList<Product> = await db.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_Product,
      [Query.limit(limit)]
    )
    const totalPages = Math.ceil(total / limit)
    const promises: Promise<Models.DocumentList<Product>>[] = []

    while (promises.length < totalPages - 1) {
      const promise: Promise<Models.DocumentList<Product>> = db.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_Product,
        [Query.limit(limit), Query.offset(promises.length * limit + limit)]
      )
      promises.push(promise)
    }

    documents.forEach((i) => products.value.push(i))

    const values = await Promise.all(promises)

    values.forEach((v) => {
      v.documents.forEach((i) => {
        if (!products.value.map((p) => p.$id).includes(i.$id)) {
          products.value.push(i)
        }
      })
    })

    const { documents: ps }: Models.DocumentList<Attribute> = await db.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_Attribute,
      [
        Query.equal(
          'product',
          products.value.map((a) => a.$id)
        )
      ]
    )
    ps.forEach((i) => attributes.value.push(i))
  }
  return {
    products,
    totalProducts,
    attributes,
    init
  }
})
