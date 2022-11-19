<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { useEmitt } from '@/hook/web/useEmitt';
import { useRouter } from 'vue-router';

const {push, currentRoute} = useRouter()

const user = ref<UserCardType>({})

useEmitt({
  name: 'getUserInfo',
  callback: (data: any) => {
    user.value = data
  }
})


</script>

<template>
  <div ref="c"
    class="app-right relative border-0 flex flex-col !p-0 rounded-3px light:bg-$light-bg-color dark:bg-v-dark">
    <n-affix :trigger-top="72" position="absulote" class="w-240px">
      <n-card class="p-5 mb-5">
        <div class="text-2xl flex items-center mb-3">
          <span>个人成就</span>
        </div>
        <div class="flex flex-col font-500">
          <div class="flex items-center mt-3">
            <SvgIcon size="25" name="user-like" class="mr-5" />
            <span>文章被点赞 {{ user.likeCount }}</span>
          </div>
          <div class="flex items-center mt-3">
            <SvgIcon size="25" name="user-comment" class="mr-5" />
            <span>文章被评论 {{ user.commentCount }}</span>
          </div>
          <div class="flex items-center mt-3">
            <SvgIcon size="25" name="user-collect" class="mr-5" />
            <span>文章被收藏 {{ user.collectCount }}</span>
          </div>
          <div class="flex items-center mt-3">
            <SvgIcon size="25" name="user-view" class="mr-5" />
            <span>文章被阅读 {{ user.viewCount }}</span>
          </div>
        </div>
      </n-card>

      <n-card class="p-5 mb-5 ">
        <div class="flex justify-between px-15 items-center">
          <div @click="push(`/space/${currentRoute.params.uid}/friends`)" class="flex flex-col items-center text-2xl cursor-pointer">
            <span class="mb-2">关注</span>
            <span class="font-600">{{ user.friends }}</span>
          </div>
          <n-divider vertical />
          <div @click="push(`/space/${currentRoute.params.uid}/fans`)" class="flex flex-col items-center text-2xl cursor-pointer">
            <span class="mb-2">粉丝</span>
            <span class="font-600">{{ user.fans }}</span>
          </div>
        </div>

      </n-card>

      <n-card class="p-5 mb-5">
        <div class="text-2xl flex items-center mb-3">
          <span>个人介绍</span>
        </div>
        <div class="mt-4 text-gray-400">{{ user.profile }}</div>
      </n-card>
    </n-affix>
  </div>
</template>


<style scoped lang="scss">
/* .n-card.n-card--bordered {
  border: 0;
} */
</style>
<style>
.app-right .n-card>.n-card__content {
  padding: 0 !important;
}

.app-right .n-divider.n-divider--vertical {
  height: 3rem;
}
</style>