<script setup lang='ts'>
import { getMyNewCommentApi } from '@/api/Comment';
import { timeago } from '@/utils/time';

const commentList = ref<Array<CommentType>>([])

onMounted(() => {
  getNewComment()
})

const getNewComment = () => {
  getMyNewCommentApi().then(res => {
    commentList.value = res.data
  })
}

</script>

<template>
  <div>
    <div v-for="comment in commentList" :key="comment.id" class="flex items-center w-full mt-10 cursor-pointer">
      <div class="mr-5">
        <n-avatar round size="large" :src="comment.user.avatar"/>
      </div>
      <div class="flex flex-col">
        <div class="flex">
          <span class="text-2xl mr-5 text-gray-500">{{ comment.user.nickname }}</span>
          <span class="text-gray-400">{{ timeago(comment.createTime)  }}</span>
        </div>
        <div>
          {{ comment.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>