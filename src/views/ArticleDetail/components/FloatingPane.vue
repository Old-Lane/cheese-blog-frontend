<script setup lang='ts'>
import { parseArticleApi } from '@/api/Article';
import SvgIcon from '@/components/SvgIcon.vue';
import { useEmitt } from '@/hook/web/useEmitt';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const { push, currentRoute } = useRouter()

interface countType {
  likeCount?: number,
  commentCount?: number,
  collectCount?: number,
  isLiked?: boolean
}

const countInfo = ref<countType>({})

useEmitt({
  name: 'PaneInfo',
  callback: (data: any) => {
    countInfo.value = data
    // countInfo.value.isLiked = data.isliked
  }
})

const parseArticle = () => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
  } else {
    parseArticleApi(currentRoute.value.params.id).then(res => {
      countInfo.value.isLiked ? countInfo.value.likeCount!-- : countInfo.value.likeCount!++
      countInfo.value.isLiked = !countInfo.value.isLiked
    })
  }
}

</script>

<template>
  <div class="flex flex-col floating-pane">
    <n-badge @click="parseArticle" :value="countInfo.likeCount" :max="1000" color="#c2c8d1">
      <div style="box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);"
        class="bg-white w-19 h-19 rounded-1/2 cursor-pointer flex items-center justify-center mb-8">
        <SvgIcon v-if="countInfo.isLiked" name="like" size="23" normal="#f6b545" hover="#515767" class="" />
        <SvgIcon v-else name="like" size="23" normal="#8a919f" hover="#515767" class="" />
      </div>
    </n-badge>

    <n-badge :value="countInfo.commentCount" :max="1000" color="#c2c8d1">
      <div style="box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);"
        class="bg-white w-19 h-19 rounded-1/2 cursor-pointer flex items-center justify-center mb-8">
        <SvgIcon name="comment" size="23" normal="#8a919f" hover="#515767" class="" />
      </div>
    </n-badge>
    <n-badge :value="countInfo.collectCount" :max="1000" color="#c2c8d1">
      <div style="box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);"
        class="bg-white w-19 h-19 rounded-1/2 cursor-pointer flex items-center justify-center mb-8">
        <SvgIcon name="collect" size="23" normal="#8a919f" hover="#515767" class="" />
      </div>
    </n-badge>
  </div>
</template>

<style lang='scss' scoped>

</style>
<style>
.floating-pane .n-badge .n-badge-sup {
  bottom: calc(100% - 19px);
}
</style>