<template>
  <div class="content-switcher">
    <button
      v-for="option in options"
      :class="{ active: value === option.id }"
      :key="option.id"
      @click="clickHandler(option.id)"
    >
      {{ option.text }}
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  options: {
    id: string;
    text: string;
  }[];
  value: string;
}>();

const emit = defineEmits(['change']);

const clickHandler = (id: string) => {
  emit('change', id);
};
</script>
<style lang="scss" scoped>
.content-switcher {
  display: flex;
  button {
    padding: 5px;
    background: none;
    border: 1px solid black;

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
    }

    &:not(:first-child) {
      border-left: none;
    }

    &.active {
      background: #5959b2;
      color: #fff;
    }
  }
}
</style>
