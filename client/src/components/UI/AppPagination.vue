<template>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :class="{ active: currentPage === page }"
      :key="page"
      @click="$emit('change-page', page)"
    >
      {{ page }}
    </button>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ totalPages: number; currentPage: number }>();
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 5px;
  button {
    background: none;
    border: none;
    &.active {
      color: red;
    }

    &:hover {
      color: red;
    }
  }
}
</style>
