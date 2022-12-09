<template>
  <div v-if="adsStore.isCurrentProductLoading" class="container loader">
    <horizontal-loader />
  </div>
  <div v-else-if="!adsStore.currentProduct" class="container">
    <p class="error">No product with id {{ $route.params.id }}</p>
  </div>
  <div v-else class="container">
    <div class="product">
      <div class="product__title">
        <h2>{{ product.title }}</h2>
        <icon-button
          v-if="isShowProductButtons"
          icon="fa-solid fa-pen-to-square"
          type="button"
          @click="onOpenEditModal"
        />
        <icon-button
          v-if="isShowProductButtons"
          icon="fa-solid fa-trash"
          type="button"
          @click="onOpenDeleteModal"
        />
      </div>
      <div class="product__info">
        <AppGallery :photos-links="product.photoLinks" />
        <div class="product__texts">
          <p><span>Description</span>: {{ description }}</p>
          <p><span>Price</span>: {{ price }}</p>
          <p><span>Contact Information</span>: {{ contacts }}</p>
          <p><span>Created</span>: {{ createdDate }}</p>
          <p><span>Updated</span>: {{ updatedDate }}</p>
        </div>
      </div>
    </div>
    <app-modal v-model="isDeleteModalOpen">
      <delete-product-modal
        @close="onCloseDeleteModal"
        @delete="onDeleteProduct"
      />
    </app-modal>
    <app-modal v-model="isEditModalOpen">
      <ad-form
        :product="productFormValues"
        @cancel="onCloseEditModal"
        @on-submit="onEditProduct"
      />
    </app-modal>
  </div>
</template>
<script lang="ts" setup>
import { useAdsStore } from '@/stores/adsStore';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppGallery from '@/components/UI/AppGallery.vue';
import IconButton from '@/components/UI/IconButton.vue';
import AppModal from '@/components/UI/AppModal.vue';
import DeleteProductModal from '@/components/marketboard/DeleteProductModal.vue';
import AdForm from '@/components/marketboard/AdForm.vue';
import { v4 as uuidv4 } from 'uuid';
import type { TAdFormType } from '@/types/adsTypes';
import { toDateFormat } from '@/utils/dates';
import { useUserStore } from '@/stores/userStore';
import HorizontalLoader from '@/components/UI/loaders/HorizontalLoader.vue';
const route = useRoute();
const router = useRouter();

const adsStore = useAdsStore();
const userStore = useUserStore();

const isDeleteModalOpen = ref(false);
const isEditModalOpen = ref(false);

const product = computed(() => {
  return adsStore.currentProduct!;
});

const price = computed(() => {
  return adsStore.currentProduct?.price || 'Not specified';
});

const description = computed(() => {
  return adsStore.currentProduct?.description || 'Not specified';
});

const contacts = computed(() => adsStore.currentProduct!.contacts);

const createdDate = computed(() => {
  return toDateFormat(adsStore.currentProduct!.createdAt);
});

const updatedDate = computed(() => {
  return toDateFormat(adsStore.currentProduct!.updatedAt);
});

const isShowProductButtons = computed(() => {
  if (!adsStore.currentProduct || !userStore.user) {
    return false;
  }
  return product.value.userId === userStore.user.id;
});

const productFormValues = computed((): TAdFormType => {
  return {
    title: product.value.title,
    description: product.value.description,
    photoLinks: product.value.photoLinks.map((link) => ({
      link,
      id: uuidv4()
    })),
    mainPhoto: product.value.mainPhoto,
    price: product.value.price,
    contacts: product.value.contacts
  };
});

const onOpenDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const onCloseDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const onOpenEditModal = () => {
  isEditModalOpen.value = true;
};

const onCloseEditModal = () => {
  isEditModalOpen.value = false;
};

const onDeleteProduct = async () => {
  await adsStore.deleteCurrentProduct();
  onCloseDeleteModal();
  await router.push('/');
};

const onEditProduct = async (product: TAdFormType) => {
  await adsStore.editCurrentProduct(product);
  onCloseEditModal();
};

onMounted(async () => {
  await adsStore.getCurrentProduct(route.params.id as string);
});
</script>
<style scoped lang="scss">
.error, .loader {
  margin-top: 30px;
  font-size: 24px;
}

.product {
  padding-top: 20px;

  &__title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__info {
    display: flex;
    gap: 20px;
    @media (max-width: 560px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__texts {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1 1;
    span {
      font-weight: 700;
      font-size: 20px;
    }
  }
}
</style>
