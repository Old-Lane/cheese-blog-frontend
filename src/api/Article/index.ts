import request from "@/utils/request";

/**
 * 保存至草稿箱
 * @param article 
 * @returns 
 */
export const draftApi = (article : object) => {
    return request({
        url: import.meta.env.VITE_BASE_URL_CREATOR + '/article/draft',
        method: 'post',
        data: article
    })
}

/**
 * 保存文章
 * @param article 
 * @returns 
 */
export const saveArticleApi = (article : object) => {
    return request({
        url: import.meta.env.VITE_BASE_URL_CREATOR + '/article/saveArticle',
        method: 'post',
        data: article
    })
}

export const getArticleList = (type: string) => {
    return request({
        url: import.meta.env.VITE_BASE_URL_CREATOR + '/article/list',
        method: 'get',
        params: {
            type: type
        }
    })
}