import $api from '@/api/api';
import type { TAdFormType, TAdType } from '@/types/adsTypes';
import type { TAllProductsResponse } from '@/types/product-responses';

export class ProductService {
  static async getAllProducts(
    page = 1,
    search = ''
  ): Promise<TAllProductsResponse> {
    try {
      const response = await $api.get<TAllProductsResponse>('/all_products', {
        params: { page, search }
      });
      return response.data;
    } catch (e) {
      return {
        products: [],
        totalCount: 0,
        totalPages: 0
      };
    }
  }

  static async getAllMyProducts(
    page = 1,
    search = ''
  ): Promise<TAllProductsResponse> {
    try {
      const response = await $api.get<TAllProductsResponse>(
        '/all_my_products',
        {
          params: { page, search }
        }
      );
      return response.data;
    } catch (e) {
      return {
        products: [],
        totalCount: 0,
        totalPages: 0
      };
    }
  }

  static async createProduct(data: TAdFormType) {
    try {
      const request = {
        ...data,
        photoLinks: data.photoLinks.map((link) => link.link)
      };
      const response = await $api.post('/product', request);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async editProduct(data: TAdType) {
    try {
      const response = await $api.put('/product', data);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async getSingleProduct(id: string): Promise<TAdType | null> {
    try {
      const response = await $api.get<TAdType>(`product/${id}`);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  static async deleteSingleProduct(id: string) {
    try {
      await $api.delete(`http://localhost:5000/api/product/${id}`);
    } catch (e) {
      console.error(e);
    }
  }
}
