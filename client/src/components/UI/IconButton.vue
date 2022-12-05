<template>
  <button class="icon-button">
    <font-icon :icon="icon" />
  </button>
</template>
<script lang="ts" setup>
defineProps<{
  icon: string;
  type: 'button' | 'submit';
}>();
</script>
<style lang="scss" scoped>
.icon-button {
  font-size: 18px;
  border: none;
  background: none;
  &:hover {
    color: #5959b2;
  }
}
</style>
