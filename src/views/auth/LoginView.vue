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
  <div class="bg-white p-4 rounded shadow">
    <div class="pb-4">
      <h3 class="text-xl">Login</h3>
    </div>
    <form @submit.prevent="loginByEmailPassword">
      <div class="flex flex-col mb-3">
        <label class="text-sm font-semibold mb-1">Email</label>
        <input
          class="p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="email"
          v-model="form.email"
        />
        <small
          class="text-red-500"
          v-if="v$?.email.$error"
          v-text="v$.email.$errors[0].$message"
        ></small>
      </div>
      <div class="flex flex-col mb-3">
        <label class="text-sm font-semibold mb-1">Password</label>
        <input
          class="p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="password"
          v-model="form.password"
        />
        <small
          class="text-red-500"
          v-if="v$?.password.$error"
          v-text="v$.password.$errors[0].$message"
        ></small>
      </div>
      <div>
        <button
          class="p-4 rounded bg-slate-500 disabled:opacity-50 font-semibold text-slate-200"
          type="submit"
          :disabled="loader"
        >
          Sign In
        </button>
      </div>
    </form>
    <div class="">
      <p class="pt-8 pb-4">Or login by</p>
      <SocialLoginComponentVue></SocialLoginComponentVue>
    </div>
  </div>
</template>
