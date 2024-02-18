<script lang="ts" setup>
import type { EmailPassword } from '@/ambient'
import { reactive, ref, type Ref } from 'vue'
import {
  useVuelidate,
  type Validation,
  type ValidationRuleCollection,
  type ServerErrors
} from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { useAccountStore } from '@/stores/account'
import { useRouter, useRoute } from 'vue-router'
import SocialLoginComponentVue from '@/components/SocialLoginComponent.vue'

const account = useAccountStore()
const route = useRoute()
const router = useRouter()

const form = reactive<EmailPassword>({
  email: '',
  password: ''
})

const rules: Ref<{ [x: string]: ValidationRuleCollection }> = ref({
  email: { email, required },
  password: { required, minLength: minLength(8) }
})

const $externalResults = ref<ServerErrors>({})
const loader = ref<boolean>(false)

const v$: Ref<Validation> = useVuelidate(rules, form, { $externalResults })

async function loginByEmailPassword(): Promise<void> {
  v$.value.$clearExternalResults()
  if (!(await v$.value.$validate())) {
    return
  }
  loader.value = true
  const promise = account.loginByEmailPassword(form)
  promise
    .then(() => {
      const q = route.query as { redirect?: string }
      if (q.redirect) {
        router.push(q.redirect)
      } else {
        if (account.isAdmin) {
          router.push('')
        } else {
          router.push('/')
        }
      }
    })
    .catch((e) => {
      $externalResults.value = { email: [e.message] }
    })
    .finally(() => {
      form.password = ''
      loader.value = false
    })
}
</script>

<template>
  <div class="pb-4">
    <h3 class="text-xl">Login</h3>
  </div>
  <form @submit.prevent="loginByEmailPassword" class="flex flex-col gap-3">
    <div>
      <label
        class="input input-bordered flex items-center gap-2"
        :class="{
          'input-error': v$?.email.$error
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
          />
          <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
          />
        </svg>
        <input type="email" class="grow" placeholder="Email" v-model="form.email" />
      </label>
      <small
        class="text-error"
        v-if="v$?.email.$error"
        v-text="v$.email.$errors[0].$message"
      ></small>
    </div>
    <div>
      <label
        class="input input-bordered flex items-center gap-2"
        :class="{
          'input-error': v$?.password.$error
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          />
        </svg>
        <input type="password" class="grow" placeholder="Password" v-model="form.password" />
      </label>
      <small
        class="text-error"
        v-if="v$?.password.$error"
        v-text="v$.password.$errors[0].$message"
      ></small>
    </div>
    <div>
      <button
        class="rounded bg-slate-500 p-4 font-semibold text-slate-200 disabled:opacity-50"
        type="submit"
        :disabled="loader"
      >
        Sign In
      </button>
    </div>
  </form>
  <div class="">
    <p class="pb-4 pt-8">Or login by</p>
    <SocialLoginComponentVue></SocialLoginComponentVue>
  </div>
</template>
