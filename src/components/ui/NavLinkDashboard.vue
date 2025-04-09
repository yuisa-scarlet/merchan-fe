<script setup lang="ts">
import { toRefs } from "vue"
import { RouterLink } from "vue-router"

interface NavLinkDashboardProps {
  name: string
  href: string
}

const props = defineProps<{ item: NavLinkDashboardProps }>()

const { item } = toRefs(props)
</script>

<template>
  <RouterLink :to="item.href" v-slot="{ isActive }">
    <span
      :class="[
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors border',
        isActive
          ? 'bg-white text-gray-950 border border-slate-200'
          : 'text-gray-700 hover:text-gray-700 hover:bg-gray-100 hover:border hover:border-slate-200 border-transparent',
      ]"
    >
      {{ item.name }}
    </span>
  </RouterLink>
</template>
