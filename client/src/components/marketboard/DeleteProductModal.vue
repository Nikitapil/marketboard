<template>
  <div class="delete-modal">
    <h1 class="delete-modal__title">Do you want to delete this ad?</h1>
    <div class="delete-modal__btns">
      <app-button
        color="primary"
        text="No"
        type="button"
        @click="$emit('close')"
      />
      <app-button
        color="danger"
        text="Yes"
        type="button"
        @click="$emit('delete')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import AppButton from '@/components/UI/AppButton.vue';
</script>
<style lang="scss" scoped>
.delete-modal {
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;

  &__title {
    font-size: 24px;
    align-self: center;
    font-weight: 700;
  }

  &__btns {
    display: flex;
    gap: 15px;
    align-self: flex-end;
  }
}
</style>
