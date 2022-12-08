import { defineStore } from 'pinia';
import type {
  IUserStoreActions,
  TUserStoreGetters,
  TUserStoreState
} from '@/types/user';
import { UserService } from '@/services/UserService';

export const useUserStore = defineStore<
  'user-store',
  TUserStoreState,
  TUserStoreGetters,
  IUserStoreActions
>({
  id: 'user-store',
  state: () => {
    return {
      user: null,
      authError: ''
    };
  },

  actions: {
    async registration(email: string, password: string, userName: string) {
      try {
        this.resetError();
        const response = await UserService.registration(
          email,
          password,
          userName
        );
        localStorage.setItem('token', response.data.accessToken);
        this.user = response.data.user;
        return true;
      } catch (e: any) {
        this.authError = e.response.data.message;
        return false;
      }
    },

    async login(email: string, password: string) {
      try {
        this.authError = '';
        const response = await UserService.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        this.user = response.data.user;
        return true;
      } catch (e: any) {
        this.authError = e.response.data.message;
        return false;
      }
    },

    resetError() {
      this.authError = '';
    },

    async checkAuth() {
      try {
        const response = await UserService.checkAuth();
        localStorage.setItem('token', response.data.accessToken);
        this.user = response.data.user;
      } catch (e) {
        this.user = null;
      }
    },

    async logOut() {
      try {
        await UserService.logOut();
        localStorage.removeItem('token');
        this.user = null;
      } catch (e) {
        console.log(e);
      }
    }
  }
});
