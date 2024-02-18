<script lang="ts" setup>
import type { AppUser } from '@/ambient'

defineEmits<{
  (e: 'clearSession'): void
}>()

defineProps<{
  user: AppUser | undefined
}>()
</script>

<template>
  <div class="flex items-center justify-center bg-base-100 p-3 md:hidden">
    <div class="navbar-center">
      <router-link :to="{ name: 'home' }" class="btn btn-ghost text-xl">AppName</router-link>
    </div>
  </div>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
      <router-link :to="{ name: 'home' }" class="btn btn-ghost hidden text-xl md:inline-flex"
        >AppName</router-link
      >
    </div>

    <div class="navbar-end flex gap-2">
      <button class="btn btn-circle btn-ghost md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <div class="form-control hidden md:inline-block">
        <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
      </div>
      <template v-if="user">
        <button class="btn btn-circle btn-ghost">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span class="badge indicator-item badge-primary badge-xs"></span>
          </div>
        </button>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                :src="`https://gravatar.com/avatar/${user.avatar}`"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><button @click="$emit('clearSession')">Logout</button></li>
          </ul>
        </div>
      </template>
      <template v-else>
        <router-link class="btn" :to="{ name: 'login' }">Login</router-link>
        <router-link class="btn btn-primary" :to="{ name: 'register' }">Sign Up</router-link>
      </template>
    </div>
  </div>
</template>
