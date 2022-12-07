<template>
  <header class="header">
    <div class="container header__container">
      <router-link class="header__link" to="/">
        <h1 class="header__title">MarketBoard</h1>
      </router-link>
      <div class="header__auth-btns">
        <button @click="onOpenloginModal">Login</button>
        <button @click="onOpenRegistrationModal">Registration</button>
      </div>
    </div>
    <app-modal v-model="isRegistrationModalOpened">
      <auth-form :is-registration="true" @close="onClosRegistrationModal" />
    </app-modal>
    <app-modal v-model="isLoginModalOpened">
      <auth-form :is-registration="false" @close="onCloseloginModal" />
    </app-modal>
  </header>
</template>
<script lang="ts" setup>
import AppModal from '@/components/UI/AppModal.vue';
import { ref } from 'vue';
import AuthForm from '@/components/auth/AuthForm.vue';

const isRegistrationModalOpened = ref(false);
const isLoginModalOpened = ref(false);

const onOpenRegistrationModal = () => (isRegistrationModalOpened.value = true);
const onClosRegistrationModal = () => (isRegistrationModalOpened.value = false);
const onOpenloginModal = () => (isLoginModalOpened.value = true);
const onCloseloginModal = () => (isLoginModalOpened.value = false);
</script>
<style lang="scss" scoped>
.header {
  min-height: 50px;
  width: 100%;
  box-shadow: 0 1px 15px #000000;
  display: flex;
  align-items: center;

  &__title {
    font-size: 24px;
    font-weight: 700;
  }

  &__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__link {
    color: black;
    text-decoration: none;
  }

  &__auth-btns {
    display: flex;
    gap: 10px;
    button {
      background: none;
      border: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
