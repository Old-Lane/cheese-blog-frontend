import request from "@/utils/request";

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfoApi = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/getInfo',
    method: 'get'
  })
}

/**
 * 根据用户id获取用户信息
 * @param id 用户id
 * @returns 
 */
export const getUserCardInfoApi = (id: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/card',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 获取用户信息详细
 * @returns 
 */
export const getUserInfoDetailApi = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/detail',
    method: 'get'
  })
}

/**
 * 修改用户信息详细
 * @returns 
 */
export const modifyUserInfoDetailApi = (userInfo : any) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/modify',
    method: 'put',
    data: userInfo
  })
}

/**
 * 获取前十作者
 * @returns 
 */
export const getAuthorTop10 = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/top10',
    method: 'get'
  })
}
