<template>
  <div class="input-container">
    <div class="control">
      <label v-if="label" :for="name">{{ label }}</label>
      <input
        v-if="tagName === 'input'"
        type="text"
        v-model="value"
        :id="name"
        :placeholder="placeholder"
        :name="name"
        :class="{ error: !!errorMessage }"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="onBlur"
      />
      <textarea
        v-else
        v-model="value"
        :id="name"
        :placeholder="placeholder"
        :name="name"
        :class="{ error: !!errorMessage }"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="onBlur"
      />
    </div>
    <span v-if="errorMessage" class="error-message">{{ error }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useField } from 'vee-validate';
import { computed, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    name: string;
    rules?: string;
    placeholder?: string;
    label?: string;
    tagName?: 'input' | 'textarea';
    customErrorMessage?: string;
  }>(),
  {
    tagName: 'input'
  }
);

const emit = defineEmits(['update:modelValue', 'on-error']);

const { value, validate, errorMessage } = useField(props.name, props.rules, {
  initialValue: props.modelValue
});

const error = computed(() => {
  return props.customErrorMessage || errorMessage.value;
});

watch(errorMessage, () => {
  emit('on-error', props.name, errorMessage.value);
});

const onBlur = () => {
  validate();
};
</script>
<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 3px;
  label {
    margin-right: 0.5rem;
    font-size: 18px;
    font-weight: 700;
  }
  input,
  textarea {
    min-width: 250px;
    min-height: 25px;
    border-radius: 6px;
    padding: 3px 5px;
    border: 1px solid black;
    flex: 1 1 auto;
    &.error {
      border-color: red;
    }
  }

  .error-message {
    color: red;
    font-size: 14px;
  }

  .control {
    display: flex;
    flex-direction: column;
  }
}
</style>
