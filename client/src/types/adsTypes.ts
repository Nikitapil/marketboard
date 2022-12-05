export type TAdFormType = {
  title: string;
  description: string;
  photoLinks: { id: string; link: string }[];
  mainPhoto: string;
  price: string;
};

export type TAdType = {
  title: string;
  description: string;
  photoLinks: string[];
  mainPhoto: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type TAdsStoreState = {
  ads: TAdType[];
  totalCount: number;
  totalPages: number;
  currentProduct: TAdType | null;
};

export type TAdsGetters = {};

export interface IAdsGetters {
  getAllProducts: (page?: number) => void;
  createProduct: (product: TAdFormType) => void;
  getCurrentProduct: (id: string) => void;
  deleteCurrentProduct: () => void;
  editCurrentProduct: (product: TAdFormType) => void;
}
