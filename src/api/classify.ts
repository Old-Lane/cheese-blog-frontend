import request from '@/utils/request'

export const getCategoryListByUid = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/classfiy/getCategoryListById'
  })
}