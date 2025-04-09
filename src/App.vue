<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const isLocal = import.meta.env.VITE_APP_ENV === 'local'
</script>

<template>
  <VueQueryDevtools v-if="isLocal" initialIsOpen />
  <RouterView />
</template>
