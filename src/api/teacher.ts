import request from "@/utils/request";

export const testApi = () => {
  return request({
      url: import.meta.env.VITE_BASE_URL_CREATOR + '/teacher/getClasses',
      method: 'get'
  })
}