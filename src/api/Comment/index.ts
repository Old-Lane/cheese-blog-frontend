import request from "@/utils/request";

export const getCommentListApi = (articleId: string|string[], sort: number) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + "/comment/list",
    method: "get",
    params: {
      articleId,
      sort
    },
  })
}

export const sendCommentApi = (comment: CommentType) => {
  return request({
    url: import.meta.env.VITE_BASE_URL_WEB + "/comment/add",
    method: "post",
    data: comment
  })
}

/**
 * 获取我的最新评论
 * @returns 
 */
export const getMyNewCommentApi = () => {
  return request({
    url: import.meta.env.VITE_BASE_URL_CREATOR + "/comment/myNew",
    method: "post"
  })
}
