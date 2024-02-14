import { ref, type Ref, type ComputedRef, computed } from 'vue'
import { defineStore } from 'pinia'
import { Account, ID, type Models } from 'appwrite'
import client from '@/lib/appwrite'
import type { OAuth2Provider, EmailPassword, EmailPasswordName } from '@/ambient'
import { useProductStore } from './product'

export const useAccountStore = defineStore('account', () => {
  const account = new Account(client)
  const product = useProductStore()

  const user: Ref<Models.User<Models.Preferences> | undefined> = ref()

  const isAuthenticated: ComputedRef<boolean> = computed(() => (user.value?.status ? true : false))

  const isAdmin: ComputedRef<boolean> = computed(() =>
    user.value?.labels.includes('admin') ? true : false
  )

  function refresh(): Promise<Models.User<Models.Preferences>> {
    const promise = account.get()
    promise.then((response) => {
      user.value = response
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
