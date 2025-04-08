<script setup lang="ts">

defineProps<{ msg: string }>()
</script>

<template>
  <h1 class="font-semibold text-blue-600">{{ msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
