<template>
  <div v-if="!adsStore.currentProduct" class="container">
    <p class="error">No product with id {{ $route.params.id }}</p>
  </div>
  <div v-else class="container">
    <div class="product">
      <h2 class="product__title">{{ product.title }}</h2>
      <div class="product__info">
        <AppGallery :photos-links="product.photoLinks" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAdsStore } from '@/stores/adsStore';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppGallery from '@/components/UI/AppGallery.vue';

const route = useRoute();

const adsStore = useAdsStore();

const product = computed(() => {
  return adsStore.currentProduct!;
});

onMounted(async () => {
  await adsStore.getCurrentProduct(route.params.id as string);
});
</script>
<style scoped lang="scss">
.error {
  margin-top: 30px;
  font-size: 24px;
}

.product {
  padding-top: 20px;

  &__title {
    font-size: 32px;
    font-weight: 700;
  }
}
</style>
