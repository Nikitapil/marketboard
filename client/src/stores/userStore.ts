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
      authError: '',
      isLoading: false
    };
  },

  actions: {
    async registration(email: string, password: string, userName: string) {
      try {
        this.isLoading = true;
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
      } finally {
        this.isLoading = false;
      }
    },

    async login(email: string, password: string) {
      try {
        this.isLoading = true;
        this.authError = '';
        const response = await UserService.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        this.user = response.data.user;
        return true;
      } catch (e: any) {
        this.authError = e.response.data.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    resetError() {
      this.authError = '';
    },

    async checkAuth() {
      try {
        this.isLoading = true;
        const response = await UserService.checkAuth();
        localStorage.setItem('token', response.data.accessToken);
        this.user = response.data.user;
      } catch (e) {
        this.user = null;
      } finally {
        this.isLoading = false;
      }
    },

    async logOut() {
      try {
        this.isLoading = true;
        await UserService.logOut();
        localStorage.removeItem('token');
        this.user = null;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
