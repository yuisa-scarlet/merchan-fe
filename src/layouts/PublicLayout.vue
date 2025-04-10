<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
  <div class="bg-slate-50">
    <div class="mx-auto max-w-7xl py-2">
      <header class="flex justify-between items-center py-2">
        <h1
          class="font-bold text-xl bg-gradient-to-br from-blue-700 to-blue-600 bg-clip-text text-transparent"
        >
          Merchan
        </h1>
        <nav class="flex gap-2">
          <RouterLink to="/" class="hover:text-gray-900 hover:font-semibold">Home</RouterLink>
        </nav>
        <div class="flex gap-3">
          <RouterLink
            :to="{ name: 'login' }"
            :class="[
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors border bg-blue-600 hover:bg-blue-700 text-white',
            ]"
          >
            Login
          </RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            :class="[
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors border text-gray-700 hover:bg-gray-100',
            ]"
          >
            Create an Account
          </RouterLink>
        </div>
      </header>
    </div>
  </div>

  <main class="mx-auto max-w-7xl">
    <RouterView />
  </main>
</template>
