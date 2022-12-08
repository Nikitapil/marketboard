<template>
  <form class="auth-form" @submit.prevent="onSubmit">
    <app-input
      v-model="email"
      name="email"
      placeholder="Enter your email"
      label="Email"
      rules="required|email"
    />
    <app-input
      v-model="password"
      name="password"
      placeholder="Enter your password"
      label="Password"
      :rules="passwordRules"
      type="password"
    />
    <app-input
      v-if="isRegistration"
      v-model="userName"
      name="UserName"
      placeholder="Enter your user name"
      label="User name"
      rules="required"
    />
    <div class="auth-form__btns">
      <app-button
        color="danger"
        text="Cancel"
        type="button"
        @click="$emit('close')"
      />
      <app-button color="primary" text="Submit" type="submit" />
    </div>
    <app-error v-if="userStore.authError" :error="userStore.authError" />
  </form>
</template>
<script lang="ts" setup>
import AppInput from '@/components/UI/AppInput.vue';
import { computed, ref } from 'vue';
import AppButton from '@/components/UI/AppButton.vue';
import { useForm } from 'vee-validate';
import AppError from '@/components/UI/AppError.vue';
import { useUserStore } from '@/stores/userStore';

const { validate } = useForm();

const userStore = useUserStore();

const props = defineProps<{
  isRegistration: boolean;
}>();

const emit = defineEmits(['submit']);

const passwordRules = computed(() => {
  return props.isRegistration ? 'required|min:8' : 'required';
});

const email = ref('');
const password = ref('');
const userName = ref('');

const onSubmit = async () => {
  const isValid = await validate();
  if (!isValid.valid) {
    return;
  }
  emit('submit', email.value, password.value, userName.value);
};
</script>
<style scoped lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__btns {
    display: flex;
    gap: 15px;
    align-self: flex-end;
  }
}
</style>
