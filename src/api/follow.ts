import request from "@/utils/request";

/**
 * 关注
 * @param id 被关注用户id
 * @returns 
 */
 export const followUserApi = (id: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/follow/follow',
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
    url: import.meta.env.VITE_BASE_URL_WEB + '/follow/unfollow',
    method: 'delete',
    params: {
      id
    }
  })
}

/**
 * 获取用户的关注
 * @param uid 用户id
 * @returns 
 */
 export const getUserFollowsApi = (uid: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/follow/list/Follows',
    method: 'get',
    params: {
      uid
    }
  })
}

/**
 * 获取用户的粉丝
 * @param uid 用户id
 * @returns 
 */
 export const getUserFansApi = (uid: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/follow/list/Fans',
    method: 'get',
    params: {
      uid
    }
  })
}