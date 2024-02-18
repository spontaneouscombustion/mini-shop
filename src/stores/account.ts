import { ref, type Ref, type ComputedRef, computed } from 'vue'
import { defineStore } from 'pinia'
import { Account, ID, type Models } from 'appwrite'
import client from '@/lib/appwrite'
import type { OAuth2Provider, EmailPassword, EmailPasswordName, AppUser } from '@/ambient'
import { useProductStore } from './product'

export const useAccountStore = defineStore('account', () => {
  const account = new Account(client)
  const product = useProductStore()

  const user: Ref<AppUser | undefined> = ref()

  const isAuthenticated: ComputedRef<boolean> = computed(() => (user.value?.status ? true : false))

  // https://gist.github.com/GaspardP/fffdd54f563f67be8944

  function hex(buffer: ArrayBuffer): string {
    let digest = ''
    const view = new DataView(buffer)
    for (let i = 0; i < view.byteLength; i += 4) {
      // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
      const value = view.getUint32(i)
      // toString(16) will transform the integer into the corresponding hex string
      // but will remove any initial "0"
      const stringValue = value.toString(16)
      // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
      // chars for Uint16 and 2 chars for Uint8)
      const padding = '00000000'
      const paddedValue = (padding + stringValue).slice(-padding.length)
      digest += paddedValue
    }

    return digest
  }

  function sha256(str: string): Promise<string> {
    // Get the string as arraybuffer.
    const buffer = new TextEncoder().encode(str)
    return crypto.subtle.digest('SHA-256', buffer).then(function (hash) {
      return hex(hash)
    })
  }

  const isAdmin: ComputedRef<boolean> = computed(() =>
    user.value?.labels.includes('admin') ? true : false
  )

  function refresh(): Promise<Models.User<Models.Preferences>> {
    const promise = account.get()
    promise.then(async (response): Promise<void> => {
      user.value = { ...response, avatar: await sha256(response.email) }
    })
    return promise
  }

  function init(): void {
    refresh().finally(() => {
      product.init()
    })
  }

  function oauth(provider: OAuth2Provider) {
    account.createOAuth2Session(provider)
  }

  function loginByEmailPassword(credentials: EmailPassword): Promise<Models.Session> {
    const { email, password } = credentials
    const promise = account.createEmailSession(email, password)
    promise.then(() => {
      refresh()
    })
    return promise
  }

  function createAccountByEmailPassword(
    credentials: EmailPasswordName
  ): Promise<Models.User<Models.Preferences>> {
    const { email, password, name } = credentials
    const promise = account.create(ID.unique(), email, password, name)
    return promise
  }

  function logout(): Promise<{}> {
    const promise = account.deleteSession('current')
    promise.then(() => (user.value = undefined))
    return promise
  }

  return {
    init,
    loginByEmailPassword,
    createAccountByEmailPassword,
    logout,
    oauth,
    isAdmin,
    isAuthenticated,
    user
  }
})
