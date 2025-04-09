<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';


</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer></footer>
  </div>
</template>