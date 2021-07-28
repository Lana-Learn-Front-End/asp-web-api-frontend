import VueRouter, { Route } from 'vue-router';
import { AxiosInstance, AxiosRequestConfig } from 'axios';


declare module 'core' {
  function useRoute(): Route

  function useRouter(): VueRouter

  function useHttp(): {
    unwrapped: AxiosInstance,

    request(config: AxiosRequestConfig): Promise<any>;
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
  }
}

