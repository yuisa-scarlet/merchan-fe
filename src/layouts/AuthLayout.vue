<script setup lang="ts"></script>

<template>
  <div class="h-screen w-full flex flex-col md:flex-row">
    <div class="w-full md:w-1/2 flex items-center justify-center">
      <main class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white overflow-hidden sm:rounded-lg">
        <RouterView />
      </main>
    </div>
    <div class="hidden md:flex w-1/2 bg-cover bg-no-repeat bg-center p-2">
      <div class="bg-gradient-to-r from-sky-500 to-indigo-600 w-full rounded-3xl"></div>
    </div>
  </div>
</template>
