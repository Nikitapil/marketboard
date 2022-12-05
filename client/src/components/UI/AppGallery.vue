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
        :class="{ active: chosenPhoto === photo.link }"
        @click="setMainPhoto(photo.link)"
      >
        <img :src="photo.link" alt="photo" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
const props = defineProps<{ photosLinks: string[] }>();

const chosenPhoto = ref(props.photosLinks[0]);

const photos = computed(() => {
  return props.photosLinks.map((link) => ({
    link,
    id: uuidv4()
  }));
});

const setMainPhoto = (link: string) => {
  chosenPhoto.value = link;
};

watch(photos, () => {
  setMainPhoto(photos.value[0].link);
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
      height: 120px;
      cursor: pointer;
      border: 2px solid black;

      &.active {
        border: 2px solid red;
      }
      img {
        width: 106px;
        height: 100%;
      }
    }
  }
}
</style>
