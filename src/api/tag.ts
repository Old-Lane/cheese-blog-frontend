import request from '@/utils/request'

export const listApi = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/tag/enable',
    method: 'get',
  })
}