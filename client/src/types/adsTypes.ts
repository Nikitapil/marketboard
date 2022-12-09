import type { EProductFilterTypes } from '@/constants/products';

export type TAdFormType = {
  title: string;
  description: string;
  photoLinks: { id: string; link: string }[];
  mainPhoto: string;
  price: string;
  contacts: string;
};

export type TAdType = {
  title: string;
  description: string;
  photoLinks: string[];
  mainPhoto: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  contacts: string;
  _id: string;
};

export type TAdsStoreState = {
  ads: TAdType[];
  totalCount: number;
  totalPages: number;
  currentProduct: TAdType | null;
  isAdsLoading: boolean;
  isCurrentProductLoading: boolean;
};

export type TAdsGetters = {};

export interface IAdsGetters {
  getAllProducts: (page?: number, filter?: EProductFilterTypes, search?: string) => void;
  createProduct: (product: TAdFormType) => void;
  getCurrentProduct: (id: string) => void;
  deleteCurrentProduct: () => void;
  editCurrentProduct: (product: TAdFormType) => void;
}
