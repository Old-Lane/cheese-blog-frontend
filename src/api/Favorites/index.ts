import request from "@/utils/request";
import { FavoritesType } from "./type";

/**
 * 新增收藏夹
 * @param data 收藏夹
 * @returns 
 */
export const addFavoritesApi = (data: FavoritesType) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/favorites/add',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户的收藏夹
 * @param data 用户id
 * @returns 
 */
export const getFavoritesApi = (data: any) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/favorites/get',
    method: 'post',
    data: data
  })
}

/**
 * 获取收藏夹及其文章
 * @param data 收藏夹id
 * @returns 
 */
export const getFavoritesDetailApi = (data: any) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/favorites/getDetail',
    method: 'post',
    data: data
  })
}

/**
 * 订阅收藏夹
 * @param id 收藏夹id
 * @returns 
 */
export const subscribeFavoritesApi = (id: string) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/favorites/subscribe',
    method: 'post',
    params: {id}
  })
}