<template>
  <header class="header">
    <div class="container header__container">
      <router-link class="header__link" to="/">
        <h1 class="header__title">MarketBoard</h1>
      </router-link>
      <div v-if="!userStore.user" class="header__auth-btns">
        <button @click="onOpenloginModal">Login</button>
        <button @click="onOpenRegistrationModal">Registration</button>
      </div>
      <div v-else class="header__auth-btns">
        <button>{{ userName }}</button>
        <button @click="onLogOut">Logout</button>
      </div>
    </div>
    <app-modal v-model="isRegistrationModalOpened">
      <auth-form
        :is-registration="true"
        @close="onClosRegistrationModal"
        @submit="onRegistrationSubmit"
      />
    </app-modal>
    <app-modal v-model="isLoginModalOpened">
      <auth-form
        :is-registration="false"
        @close="onCloseloginModal"
        @submit="onLogin"
      />
    </app-modal>
  </header>
</template>
<script lang="ts" setup>
import AppModal from '@/components/UI/AppModal.vue';
import { computed, ref } from 'vue';
import AuthForm from '@/components/auth/AuthForm.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const isRegistrationModalOpened = ref(false);
const isLoginModalOpened = ref(false);

const userName = computed(() => {
  if (!userStore.user) {
    return '';
  }
  return userStore.user.userName;
});

const onOpenRegistrationModal = () => {
  userStore.resetError();
  isRegistrationModalOpened.value = true;
};

const onClosRegistrationModal = () => (isRegistrationModalOpened.value = false);

const onOpenloginModal = () => {
  userStore.resetError();
  isLoginModalOpened.value = true;
};

const onCloseloginModal = () => (isLoginModalOpened.value = false);

const onRegistrationSubmit = async (
  email: string,
  password: string,
  userName: string
) => {
  const isRegistered = await userStore.registration(email, password, userName);
  if (isRegistered) {
    onClosRegistrationModal();
  }
};

const onLogOut = async () => {
  await userStore.logOut();
};

const onLogin = async (email: string, password: string) => {
  const isLoggedIn = await userStore.login(email, password);
  if (isLoggedIn) {
    onCloseloginModal();
  }
};
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
