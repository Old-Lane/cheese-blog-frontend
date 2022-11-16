declare type CommentType = {
  articleId: string | string[],
  parentId: string,
  rootParent: string,
  targetId: string,
  content: string
}