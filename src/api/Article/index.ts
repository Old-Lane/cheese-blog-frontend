import request from "@/utils/request";

/**
 * 保存至草稿箱
 * @param article 
 * @returns 
 */
export const draft = (article : object) => {
    return request({
        url: import.meta.env.VITE_BASE_URL_CREATOR + '/article/draft',
        method: 'post',
        data: article
    })
}