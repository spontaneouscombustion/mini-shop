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
  <div class="pb-4">
    <h3 class="text-xl">Registration</h3>
  </div>
  <form method="POST" class="flex flex-col gap-3" @submit.prevent="createAccountByEmailPassword">
    <div>
      <label
        class="input input-bordered flex items-center gap-2"
        :class="{
          'input-error': v$?.name.$error
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
          />
        </svg>
        <input type="text" class="grow" placeholder="Username" v-model="form.name" />
      </label>
      <small class="text-error" v-if="v$?.name.$error" v-text="v$.name.$errors[0].$message"></small>
    </div>
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
        Create my account
      </button>
    </div>
  </form>
  <div class="">
    <p class="pb-4 pt-8">Or create an account using</p>
    <SocialLoginComponentVue></SocialLoginComponentVue>
  </div>
</template>
