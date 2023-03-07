<script setup lang='ts'>
import { getAboutByIdApi } from '@/api/Article';
import SvgIcon from '@/components/SvgIcon.vue';
import UserInfoCard from '@/components/UserInfoCard/index.vue'
import { useRouter } from 'vue-router';

const { currentRoute, push } = useRouter()
const about = ref<Array<Article>>([])
const isCursor = ref(false)
const index = ref('')

onMounted(() => {
  getAbout()
})

const getAbout = () => {
  getAboutByIdApi(currentRoute.value.params.id).then((res) => {
    about.value = res.data
  })
}

const enterHandle = (id?: string) => {
  index.value = id!
  isCursor.value = true
}

const toDetail = (id?: string) => {
  push(`/article/${id}`)
}
</script>

<template>
  <div class="w-300px flex flex-col">
    <UserInfoCard class="mb-8"/>
    <n-card class="mb-8">
      <div class="text-2xl flex items-center mb-3 text-hex-97A8E7">
        <SvgIcon name="recomend" :size="22" class="mr-2" normal="#97A8E7"/>
        <span>相关文章</span>
      </div>
      <div v-if="about.length === 0" class="flex justify-center">
        <SvgIcon name="empty" size="200"/>
      </div>
      <div @click="toDetail(item.id)" v-else v-for="(item) in about" :key="item.id" @mouseenter="enterHandle(item.id)" @mouseleave="isCursor = false" class="cursor-pointer mt-5">
        <p :class="{color: isCursor && item.id === index}" class="title">{{ item.title }}</p>
        <p class="flex items-center">
          <span class="text-gray-400">{{ item.likeCount }} 点赞</span>
          <span class="px-3">·</span>
          <span class="text-gray-400">{{ item.commentCount }} 评论</span>
        </p>
      </div>
    </n-card>
    <n-card>
      <div class="text-2xl flex items-center mb-3 text-hex-97A8E7">
        <SvgIcon name="recomend" :size="22" class="mr-2" />
        <span>目录</span>
      </div>
      <div class="flex justify-center h-40">占个位</div>
    </n-card>
  </div>
</template>

<style lang='scss' scoped>
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.color {
  color: var(--primary-color-hover);
}
</style>