<template>
  <form @submit.prevent="onSubmit" class="ad-form">
    <h2 class="ad-form__title">New ad</h2>
    <app-input
      v-model="adInfo.title"
      name="Title"
      label="Title:"
      rules="required"
      placeholder="Enter ad title"
    />
    <app-input
      v-model="adInfo.description"
      name="description"
      label="Description:"
      placeholder="Enter ad description"
      tag-name="textarea"
    />
    <app-input
      v-model="adInfo.price"
      name="price"
      label="Price:"
      placeholder="Enter price"
      rules="numeric"
    />
    <div v-for="(link, index) in adInfo.photoLinks" :key="link.id">
      <div class="photolink-control">
        <app-input
          v-model="link.link"
          class="photolink"
          custom-error-message="Link is required"
          :name="link.id"
          rules="required|url"
          :label="`Photo link: ${index + 1}`"
          placeholder="Enter link to photo"
        />
        <button
          v-if="index !== 0"
          class="delete-link-btn"
          type="button"
          @click="onDeletePhotoLink(link.id)"
        >
          &#10008;
        </button>
      </div>
      <div class="photo-link-radio">
        <label :for="`is_main_${link.id}`">Mark as main</label>
        <input
          v-model="adInfo.mainPhoto"
          type="radio"
          name="mainPhoto"
          :checked="index === 0"
          :id="`is_main_${link.id}`"
          :value="link.link"
        />
      </div>
    </div>
    <app-button
      class="add-btn"
      type="button"
      text="Add photo link"
      color="primary"
      @click="onAddPhotolink"
    />
    <hr />
    <div class="buttons">
      <app-button
        color="danger"
        text="Cancel"
        type="button"
        @click="$emit('cancel')"
      />
      <app-button color="success" :text="submitButtonText" type="submit" />
    </div>
  </form>
</template>

<script setup lang="ts">
import AppInput from '@/components/UI/AppInput.vue';
import { computed, onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import AppButton from '@/components/UI/AppButton.vue';
import { useForm } from 'vee-validate';
import type { TAdFormType } from '@/types/adsTypes';
const props = defineProps<{
  product?: TAdFormType;
}>();
const emit = defineEmits(['on-submit']);

const { validate } = useForm();

const adInfo = ref<TAdFormType>({
  title: '',
  description: '',
  photoLinks: [{ id: uuidv4(), link: '' }],
  mainPhoto: '',
  price: ''
});

const onAddPhotolink = () => {
  adInfo.value.photoLinks.push({ id: uuidv4(), link: '' });
};

const onDeletePhotoLink = (id: string) => {
  adInfo.value.photoLinks = adInfo.value.photoLinks.filter(
    (link) => link.id !== id
  );
};

const onSubmit = async () => {
  const isValid = await validate();
  if (isValid.valid) {
    emit('on-submit', adInfo.value);
  }
};

const submitButtonText = computed(() => {
  return props.product ? 'Edit' : 'Create';
});

onMounted(() => {
  if (props.product) {
    adInfo.value = props.product;
  }
});
</script>

<style lang="scss" scoped>
.ad-form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    font-weight: 700;
    font-size: 22px;
    align-self: center;
  }

  .photo-link-radio {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 3px;
  }

  .add-btn {
    align-self: center;
  }

  .delete-link-btn {
    border: none;
    background: none;
    font-size: 14px;
    &:hover {
      font-size: 16px;
    }
  }

  .photolink-control {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .photolink {
    flex: 1 1 auto;
  }

  .buttons {
    display: flex;
    gap: 50px;
    align-self: center;
  }
}
</style>
