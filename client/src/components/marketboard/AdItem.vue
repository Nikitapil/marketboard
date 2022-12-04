<template>
  <div class="product">
    <h3 class="product__title">{{ ad.title }}</h3>
    <div class="product__photo">
      <img :src="ad.mainPhoto" alt="ad photo" />
    </div>
    <div class="product__footer">
      <p>Price: {{ price }}</p>
      <app-button
        type="button"
        text="Show details"
        color="primary"
        @click="$router.push(`/${ad._id}`)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TAdType } from '@/types/adsTypes';
import AppButton from '@/components/UI/AppButton.vue';
import { computed } from 'vue';
const props = defineProps<{
  ad: TAdType;
}>();

const price = computed(() => {
  return props.ad.price || 'Not specified';
});
</script>
<style scoped lang="scss">
.product {
  max-width: 320px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;

  &__photo {
    max-width: 100%;
    margin-bottom: 10px;
    img {
      width: 298px;
      height: 200px;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  &__footer {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
