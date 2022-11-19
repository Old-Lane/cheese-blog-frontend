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
 * 关注
 * @param id 被关注用户id
 * @returns 
 */
export const followUserApi = (id: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/follow',
    method: 'post',
    params: {
      id
    }
  })
}

/**
 * 取关
 * @param id 被关注用户id
 * @returns 
 */
 export const unfollowUserApi = (id: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/user/unfollow',
    method: 'delete',
    params: {
      id
    }
  })
}