import request from '@/utils/request'

export const getCategoryListApi = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/category/list'
  })
}