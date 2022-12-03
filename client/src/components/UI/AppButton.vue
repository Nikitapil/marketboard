<template>
  <button :class="['app-button', color]" :type="type">{{ text }}</button>
</template>
<script lang="ts" setup>
defineProps<{
  text: string;
  color: 'primary' | 'success' | 'danger';
  type: 'button' | 'submit';
}>();
</script>
<style lang="scss" scoped>
.app-button {
  background: #5959b2;
  border: none;
  border-radius: 6px;
  min-width: 120px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  &.success {
    background: #11c911;
  }

  &.danger {
    background: red;
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
  }
}
</style>
