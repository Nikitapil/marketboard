import $api from '@/api/api';
import type { AxiosResponse } from 'axios';
import type { TAuthResponse } from '@/types/user';

export class UserService {
  static async registration(
    email: string,
    password: string,
    userName: string
  ): Promise<AxiosResponse<TAuthResponse>> {
    return await $api.post<TAuthResponse>('/registration', {
      email,
      password,
      userName
    });
  }

  static async checkAuth(): Promise<AxiosResponse<TAuthResponse>> {
    return await $api.get<TAuthResponse>('/refresh');
  }

  static async logOut() {
    return await $api.post('/logout');
  }

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<TAuthResponse>> {
    return await $api.post<TAuthResponse>('/login', {
      email,
      password
    });
  }
}
