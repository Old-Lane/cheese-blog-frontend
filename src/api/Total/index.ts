import request from "@/utils/request";

/**
 * 获取数据
 * @returns 
 */
export const getTotalApi = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_CREATOR + "/total/get",
    method: "post"
  })
}