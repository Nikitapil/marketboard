<template>
  <div class="error">{{ error }}</div>
</template>
<script lang="ts" setup>
defineProps<{
  error: string;
}>();
</script>
<style lang="scss" scoped>
.error {
  border: 2px solid #db7093;
  background: rgba(218, 95, 95, 0.59);
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  padding: 10px;
}
</style>
