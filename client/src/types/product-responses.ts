import type { TAdType } from '@/types/adsTypes';

export type TAllProductsResponse = {
  products: TAdType[];
  totalCount: number;
  totalPages: number;
};
