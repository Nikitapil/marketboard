<template>
  <div class="container">
    <div class="page-container">
      <h2 class="page-title">Ads list</h2>
      <section>
        <button class="create-btn">Create new ad</button>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.create-btn {
  background: none;
  border: none;
  font-size: 24px;
  text-decoration: underline;
  transition: 0.4s;

  &:hover {
    text-shadow: 0.5px 0.5px 1.5px black;
  }

  &:active {
    text-shadow: unset;
  }
}
</style>
