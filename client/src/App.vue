<template>
  <app-header />
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/App/AppHeader.vue';
</script>

<style scoped></style>
