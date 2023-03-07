import request from "@/utils/request"

/**
 * 保存至草稿箱
 * @param article
 * @returns
 */
export const draftApi = (article: object) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_CREATOR + "/article/draft",
    method: "post",
    data: article,
  })
}

/**
 * 保存文章
 * @param article
 * @returns
 */
export const saveArticleApi = (article: object) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_CREATOR + "/article/saveArticle",
    method: "post",
    data: article,
  })
}

/**
 * 获取文章
 * @param type 文章类型
 * @returns
 */
export const getArticleListApi = (
  type: string,
  pageSize?: number,
  pageNum?: number
) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_CREATOR + "/article/list",
    method: "get",
    params: {
      type,
      pageSize,
      pageNum,
    },
  })
}

/**
 * 根据文章id获取文章
 * @param id 文章id
 * @returns 
 */
export const getArticleByIdApi = (id: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + "/article/getArticle",
    method: "get",
    params: {
      id: id,
    }
  })
}

/**
 * 获取主页和个人空间的文章
 * @param sort 排序规则
 * @param page 页码
 * @param pageSize 页大小
 * @param uid 用户id
 * @returns 
 */
export const listAllApi = (sort: string, page?: number, pageSize?: number, uid?: string) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + "/article/list",
    method: "get",
    params: {
      sort,
      page,
      pageSize,
      uid
    }
  })
}

/**
 * 文章点赞
 * @param id 文章id
 * @returns 
 */
export const parseArticleApi = (id: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + "/article/like",
    method: "put",
    params: {
      aid: id,
    }
  })
}

/**
 * 根据文章id获取x相关文章
 * @param id 文章id
 * @returns 
 */
export const getAboutByIdApi = (id: string | string[]) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + "/article/getAbout",
    method: "get",
    params: {
      id: id,
    }
  })
}
