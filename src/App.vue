<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const route = useRoute()
const isLocal = import.meta.env.VITE_APP_ENV === 'local'
</script>

<template>
  <nav v-if="!route.meta.hide" class="flex gap-2">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
  </nav>

  <VueQueryDevtools v-if="isLocal" initialIsOpen />
  <RouterView />
</template>
