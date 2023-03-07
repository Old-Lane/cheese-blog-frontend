import request from "@/utils/request";
import { FavoritesType } from "./type";

/**
 * 新增收藏夹
 * @param uid 用户id
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
 * @param uid 用户id
 * @returns 
 */
export const getFavoritesApi = (data: any) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + '/favorites/get',
    method: 'post',
    data: data
  })
}