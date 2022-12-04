import { defineStore } from 'pinia';
import type {
  IAdsGetters,
  TAdFormType,
  TAdsGetters,
  TAdsStoreState
} from '@/types/adsTypes';
import { ProductService } from '@/services/ProductService';

export const useAdsStore = defineStore<
  'ads-store',
  TAdsStoreState,
  TAdsGetters,
  IAdsGetters
>({
  id: 'ads-store',
  state: () => {
    return {
      ads: [],
      totalCount: 0,
      totalPages: 0,
      currentProduct: null
    };
  },

  actions: {
    async getAllProducts(page = 1) {
      const data = await ProductService.getAllProducts(page);
      this.ads = data.products;
      this.totalCount = data.totalCount;
      this.totalPages = data.totalPages;
    },
    async createProduct(product: TAdFormType) {
      await ProductService.createProduct(product);
      await this.getAllProducts();
    },

    async getCurrentProduct(id: string) {
      this.currentProduct = await ProductService.getSingleProduct(id);
    }
  }
});
