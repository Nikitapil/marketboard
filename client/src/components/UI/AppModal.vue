<template>
  <div>
    <Transition name="overlay">
      <div class="overlay" v-if="modelValue" @click="onClose"></div>
    </Transition>
    <transition name="fade" mode="out-in">
      <div class="content" v-if="modelValue">
        <button class="close-btn" @click="onClose">&#10008;</button>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const onClose = () => emit('update:modelValue', false);
</script>
<style scoped lang="scss">
.overlay {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
}

.content {
  min-width: 50%;
  min-height: 150px;
  max-width: 90%;
  margin: 0 auto;
  border-radius: 15px;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  background: white;
  padding: 20px;
}

.close-btn {
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  height: 18px;
  border: none;
  background: none;

  &:hover {
    font-size: 18px;
  }

  &:active {
    font-size: 16px;
  }
}

.fade-enter-active {
  animation: content-toggle 0.3s;
}
.fade-leave-active {
  animation: content-toggle 0.3s reverse;
}

.overlay-enter-active {
  animation: overlay-toggle 0.1s;
}
.overlay-leave-active {
  animation: overlay-toggle 0.3s reverse;
}

@keyframes content-toggle {
  0% {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

@keyframes overlay-toggle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
