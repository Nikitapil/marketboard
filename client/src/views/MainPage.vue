<template>
  <div class="container">
    <div class="page-container">
      <h2 class="page-title">Ads list</h2>
      <section class="main-controls">
        <button v-if="userStore.user" class="create-btn" @click="onOpenAdForm">
          Create new ad
        </button>
        <content-switcher
          v-if="userStore.user"
          :options="filterOptions"
          :value="filterValue"
          @change="onFilterChange"
        />
        <app-modal v-model="isAdFormOpened">
          <ad-form @cancel="onCloseAdForm" @on-submit="onCreate" />
        </app-modal>
      </section>
      <section class="products-container">
        <ad-item v-for="ad in adsStore.ads" :key="ad._id" :ad="ad" />
      </section>
      <app-pagination
        :total-pages="adsStore.totalPages"
        :current-page="page"
        @change-page="onChangePage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import AppModal from '@/components/UI/AppModal.vue';
import { ref, watch } from 'vue';
import AdForm from '@/components/marketboard/AdForm.vue';
import { useAdsStore } from '@/stores/adsStore';
import AdItem from '@/components/marketboard/AdItem.vue';
import type { TAdFormType } from '@/types/adsTypes';
import AppPagination from '@/components/UI/AppPagination.vue';
import { useUserStore } from '@/stores/userStore';
import ContentSwitcher from '@/components/UI/ContentSwitcher.vue';
import { EProductFilterTypes } from '@/constants/products';

const adsStore = useAdsStore();
const userStore = useUserStore();

const isAdFormOpened = ref(false);
const page = ref(1);
const filterValue = ref(EProductFilterTypes.ALL);

const filterOptions = ref([
  {
    id: EProductFilterTypes.ALL,
    text: 'All'
  },
  {
    id: EProductFilterTypes.MY,
    text: 'My'
  }
]);

const getProducts = async () => {
  await adsStore.getAllProducts(page.value, filterValue.value);
};

const onFilterChange = async (id: EProductFilterTypes) => {
  filterValue.value = id;
  if (page.value !== 1) {
    page.value = 1;
    return;
  }
  await getProducts();
};

watch(
  page,
  () => {
    getProducts();
  },
  { immediate: true }
);

const onChangePage = (p: number) => (page.value = p);

const onOpenAdForm = () => (isAdFormOpened.value = true);
const onCloseAdForm = () => (isAdFormOpened.value = false);

const onCreate = async (adInfo: TAdFormType) => {
  if (!adInfo.mainPhoto) {
    adInfo.mainPhoto = adInfo.photoLinks[0].link;
  }
  await adsStore.createProduct(adInfo);
  onCloseAdForm();
};
</script>
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

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.main-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
}
</style>
