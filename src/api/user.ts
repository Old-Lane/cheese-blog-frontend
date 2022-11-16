import request from "@/utils/request";

export const getUserInfoApi = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/getInfo',
    method: 'get'
  })
}

export const getUserCardInfoApi = (id: string) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/card',
    method: 'get',
    params: {
      id
    }
  })
}