/// <reference types="vite/client" />

import { AxiosRequestConfig } from 'axios'

interface Result {
  code: number,
  message: string,
  data: object | string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'js-cookie'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<Result | any>
  }
}