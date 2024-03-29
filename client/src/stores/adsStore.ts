import { defineStore } from 'pinia';
import type {
  IAdsGetters,
  TAdFormType,
  TAdsGetters,
  TAdsStoreState
} from '@/types/adsTypes';
import { ProductService } from '@/services/ProductService';
import { EProductFilterTypes } from '@/constants/products';

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
      currentProduct: null,
      isAdsLoading: false,
      isCurrentProductLoading: false
    };
  },

  actions: {
    async getAllProducts(
      page = 1,
      filter = EProductFilterTypes.ALL,
      search = ''
    ) {
      this.isAdsLoading = true;
      const data =
        filter === EProductFilterTypes.ALL
          ? await ProductService.getAllProducts(page, search.trim())
          : await ProductService.getAllMyProducts(page, search.trim());
      this.ads = data.products;
      this.totalCount = data.totalCount;
      this.totalPages = data.totalPages;
      this.isAdsLoading = false;
    },

    async createProduct(product: TAdFormType) {
      await ProductService.createProduct(product);
      await this.getAllProducts();
    },

    async getCurrentProduct(id: string) {
      this.isCurrentProductLoading = true;
      this.currentProduct = await ProductService.getSingleProduct(id);
      this.isCurrentProductLoading = false;
    },

    async deleteCurrentProduct() {
      if (!this.currentProduct) {
        return;
      }
      await ProductService.deleteSingleProduct(this.currentProduct._id);
      this.currentProduct = null;
      await this.getAllProducts();
    },

    async editCurrentProduct(product: TAdFormType) {
      if (!this.currentProduct) {
        return;
      }
      const request = {
        ...this.currentProduct,
        ...product,
        photoLinks: product.photoLinks.map((link) => link.link)
      };
      this.isCurrentProductLoading = true;
      await ProductService.editProduct(request);
      await this.getCurrentProduct(this.currentProduct._id);
    }
  }
});
