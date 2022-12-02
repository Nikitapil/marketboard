<template>
  <header class="header">
    <div class="container header__container">
      <h1 class="header__title">MarketBoard</h1>
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
}
</style>
