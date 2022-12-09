<template>
  <form class="form" @submit.prevent="$emit('search')">
    <app-input
      v-model="searchValue"
      name="search"
      placeholder="search ads..."
    />
    <app-button color="success" text="Search" type="submit" />
  </form>
</template>
<script setup lang="ts">
import AppInput from '@/components/UI/AppInput.vue';
import AppButton from '@/components/UI/AppButton.vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(['update:modelValue', 'search']);

const searchValue = ref('');

watch(searchValue, () => {
  emit('update:modelValue', searchValue.value);
});

watch(
  props,
  () => {
    searchValue.value = props.modelValue;
  },
  { immediate: true }
);
</script>
<style scoped lang="scss">
.form {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
