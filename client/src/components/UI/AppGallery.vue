<template>
  <div class="gallery">
    <div class="gallery__chosen">
      <img :src="chosenPhoto" alt="photo" />
    </div>
    <div class="gallery__switcher">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="gallery__switcher-photo"
      >
        <img :src="photo.link" alt="photo" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
const props = defineProps<{ photosLinks: string[] }>();

const chosenPhoto = ref(props.photosLinks[0]);

const photos = computed(() => {
  return props.photosLinks.map((link) => ({
    link,
    id: uuidv4()
  }));
});
</script>
<style scoped lang="scss">
.gallery {
  width: 330px;

  &__chosen {
    max-width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #cccccc;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__switcher {
    max-width: 100%;
    display: flex;
    overflow-y: auto;
    &-photo {
      max-width: 110px;
      height: 140px;
      cursor: pointer;
      border: 2px solid black;
      img {
        width: 106px;
        height: 100%;
      }
    }
  }
}
</style>
