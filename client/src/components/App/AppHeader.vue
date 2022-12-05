<template>
  <header class="header">
    <div class="container header__container">
      <router-link class="header__link" to="/">
        <h1 class="header__title">MarketBoard</h1>
      </router-link>
    </div>
  </header>
</template>
<script lang="ts" setup></script>
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
  }

  &__link {
    color: black;
    text-decoration: none;
  }
}
</style>
