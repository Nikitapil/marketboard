<template>
  <div class="container">
    <div class="page-container">
      <h2 class="page-title">Ads list</h2>
      <section>
        <button class="create-btn" @click="onOpenAdForm">Create new ad</button>
        <app-modal v-model="isAdFormOpened">
          <ad-form/>
        </app-modal>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppModal from '@/components/UI/AppModal.vue';
import { ref } from 'vue';
import AdForm from '@/components/marketboard/AdForm.vue';
const isAdFormOpened = ref(false);

const onOpenAdForm = () => (isAdFormOpened.value = true);
</script>
<style lang="scss" scoped>
.create-btn {
  background: none;
  border: none;
  font-size: 24px;
  text-decoration: underline;
  transition: 0.4s;

  &:hover {
    text-shadow: 0.5px 0.5px 1.5px black;
  }

  &:active {
    text-shadow: unset;
  }
}
</style>
