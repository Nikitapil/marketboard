<template>
  <app-header />
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/App/AppHeader.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.checkAuth();
})
</script>

<style scoped></style>
