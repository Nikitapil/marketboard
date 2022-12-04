<template>
  <div v-if="!adsStore.currentProduct" class="container">
    <p class="error">No product with id {{ $route.params.id }}</p>
  </div>
  <div v-else class="container">
    <div class="product">
      <h2>{{ product.title }}</h2>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAdsStore } from '@/stores/adsStore';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const adsStore = useAdsStore();

const product = computed(() => {
  return adsStore.currentProduct!;
});

onMounted(async () => {
  await adsStore.getCurrentProduct(route.params.id as string);
});
</script>
