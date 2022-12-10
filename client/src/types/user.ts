export type TUser = {
  id: string;
  userName: string;
  email: string;
  role: string;
};

export type TUserStoreState = {
  user: TUser | null;
  authError: string;
  isLoading: boolean;
};

export type TUserStoreGetters = {};

export interface IUserStoreActions {
  registration: (email: string, password: string, userName: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  resetError: () => void;
  checkAuth: () => void;
  logOut: () => void;
}

export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: TUser;
};
