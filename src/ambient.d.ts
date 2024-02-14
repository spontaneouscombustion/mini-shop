// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
import type { Models } from 'appwrite'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean
    // must be declared by every route
    requiresAuth: boolean
  }
}

// To ensure it is treated as a module, add at least one `export` statement
export interface EmailPassword {
  email: string
  password: string
}

export interface EmailPasswordName extends EmailPassword {
  name: string
}

export interface Product extends Models.Document {
  name: string
  description?: string
  photos: string[]
}

export type Products = Product[]

//export type Products = Product[] & Models.DocumentList

export interface Attribute extends Models.Document {
  name: string
  price: number
  stock: number
  description?: string
  product: Product
  images: string[]
}

export type Attributes = Attribute[]

export type ProductWithSpec = {
  specs: Attribute[]
  stocks: number
} & Product

export enum OAuth2Provider {
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  GOOGLE = 'google'
}

export type InputTypeAttributes = 'text' | 'email' | 'password' | (string & {})
