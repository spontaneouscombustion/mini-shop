<script lang="ts" setup>
import type { EmailPasswordName } from '@/ambient'
import { reactive, ref, type Ref } from 'vue'
import {
  useVuelidate,
  type Validation,
  type ServerErrors,
  type ValidationRuleCollection
} from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { useAccountStore } from '@/stores/account'
import { useRouter } from 'vue-router'
import SocialLoginComponentVue from '@/components/SocialLoginComponent.vue'

const form = reactive<EmailPasswordName>({
  email: '',
  password: '',
  name: ''
})

const rules: Ref<{
  [x: string]: ValidationRuleCollection
}> = ref({
  email: {
    email,
    required
  },
  password: {
    required,
    minLength: minLength(8)
  },
  name: {
    required,
    minLength: minLength(4)
  }
})

const account = useAccountStore()
const router = useRouter()
const $externalResults = ref<ServerErrors>({})
const v$: Ref<Validation> = useVuelidate(rules, form, { $externalResults })
const loader = ref<boolean>(false)

async function createAccountByEmailPassword(): Promise<void> {
  if (!(await v$.value.$validate())) {
    return
  } else {
    loader.value = true
    account
      .createAccountByEmailPassword(form)
      .then((user) => {
        alert(`Account ${user.name} has been created successfully!`)
        router.push('/login')
      })
      .catch((e) => {
        console.log(e)
        alert(e.message)
      })
      .finally(() => {
        form.password = ''
        loader.value = false
      })
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded shadow">
    <div class="pb-4">
      <h3 class="text-xl">Registration</h3>
    </div>
    <form method="POST" @submit.prevent="createAccountByEmailPassword">
      <div class="flex flex-col mb-3">
        <label class="text-sm font-semibold mb-1">Name</label>
        <input
          class="p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="form.name"
        />
        <small
          class="text-red-500"
          v-if="v$?.name.$error"
          v-text="v$.name.$errors[0].$message"
        ></small>
      </div>
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
          Create my account
        </button>
      </div>
    </form>
    <div class="">
      <p class="pt-8 pb-4">Or create an account using</p>
      <SocialLoginComponentVue></SocialLoginComponentVue>
    </div>
  </div>
</template>
