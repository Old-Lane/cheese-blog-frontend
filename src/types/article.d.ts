declare type Article = {
  id?: string,
  title?: string,
  content?: string,
  summary?: string,
  cover?: string,
  status?: number,
  source?: number,
  createTime?: string,
  publishTime?: string,
  views?: number,
  commentCount?: string,
  collectCount?: string,
  likeCount?: string,
  audit?: number,
  updateTime?: string,
  categoryName?: string,
  userId?: string,
  author?: string,
  isLiked?: boolean
}

declare type ArticleType = {
  all?: number,
  public?: number,
  private?: number,
  audit?: number,
  draft?: number,
  deleted?: number
}