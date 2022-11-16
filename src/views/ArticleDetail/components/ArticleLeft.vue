<script setup lang='ts'>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { getArticleByIdApi } from '@/api/Article';
import { useRouter } from 'vue-router';
import CommentList from "@/components/Comment/CommentList.vue";
import SendComment from "@/components/Comment/SendComment.vue";
import { useEmitt } from "@/hook/web/useEmitt";


const { currentRoute } = useRouter()


const article = ref<Article>({})
const tagList = ref<Array<TagType>>([])

onMounted(() => {
  nextTick(() => {
    getArticleByIdApi(currentRoute.value.params.id).then(res => {
      article.value = res.data.articleInfo
      tagList.value = res.data.tagInfo
      useEmitt().emitter.emit('PaneInfo', {
        likeCount: res.data.articleInfo.likeCount,
        commentCount: res.data.articleInfo.commentCount,
        collectCount: res.data.articleInfo.collectCount
      })
    })
  })
})

</script>

<template>
  <div class="w-820px app-left">
    <n-card class="">
      <div class="mk-cute-theme">
        <div class=" text-5xl font-500 my-6">{{ article.title }}</div>
        <div class="flex items-center text-lg !text-gray-400 mt-3">
          <span class="mr-8">修改于{{ article.updateTime }}</span>
          <span class="mr-8">阅读&nbsp;&nbsp;{{ article.views }}</span>
          <span>
            <n-tag v-if="article.source === 1" size="small" type="warning">原创</n-tag>
            <n-tag v-else size="small" type="warning">转载</n-tag>
          </span>
        </div>
      </div>

      <md-editor v-model="article.content" :previewOnly="true" preview-theme="mk-cute" :showCodeRowNumber="true"
        class="dark:bg-v-dark" />

      <div class="flex items-center my-10">
        <div class="flex items-center mr-10">
          <span>分类专栏：</span>
          <n-tag>{{ article.categoryName }}</n-tag>
        </div>
        <div class="flex items-center">
          <span>标签：</span>
          <n-space>
            <n-tag v-for="item in tagList" type="warning">{{ item.name }}</n-tag>
          </n-space>
        </div>
      </div>
    </n-card>
    <n-card class="my-8">
      <div class="pb-5">
        <div class="mb-5">
          <span class="font-700 text-3xl">评论</span>
        </div>
        <SendComment />
      </div>
      <div>
        <CommentList :authorId="article.userId" />
      </div>
    </n-card>
  </div>
</template>

<style lang='scss'>
.app-left .n-tabs .n-tabs-rail .n-tabs-tab-wrapper {
  width: 7rem;
}

.app-left .n-tabs .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab.n-tabs-tab--active {
  color: var(--primary-color-hover) !important;
}
</style>