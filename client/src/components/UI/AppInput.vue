<template>
  <div>
    <input type="text" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  name: string;
}>();
</script>
