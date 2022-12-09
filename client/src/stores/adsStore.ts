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
      currentProduct: null
    };
  },

  actions: {
    async getAllProducts(page = 1, filter = EProductFilterTypes.ALL) {
      const data =
        filter === EProductFilterTypes.ALL
          ? await ProductService.getAllProducts(page)
          : await ProductService.getAllMyProducts(page);
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
      await ProductService.editProduct(request);
      await this.getCurrentProduct(this.currentProduct._id);
    }
  }
});
