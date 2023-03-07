<script setup lang='ts'>
import { getTotalApi } from '@/api/Total';

const total = ref({
  articleCount: 0,
  commentCount: 0,
  collectCount: 0,
  followCount: 0
})

onMounted(() => {
  getTotal()
})

const getTotal = () => {
  getTotalApi().then(res => {
    total.value = res.data
  })
}
</script>

<template>
  <div>
    <n-grid x-gap="12" :cols="4">
      <n-gi>
        <n-card hoverable class="h-42 bg-hex-fef8ec text-$primary-color-hover dark:bg-hex-392f22">
          <div class="flex flex-col justify-between h-full">
            <span class="text-3xl font-700 h-10">文章数量</span>
            <span class="h-10 text-2xl">{{ total.articleCount }}</span>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card hoverable class="h-42 bg-hex-fef8ec text-$primary-color-hover dark:bg-hex-392f22">
          <div class="flex flex-col justify-between h-full">
            <span class="text-3xl font-700 h-10">评论数量</span>
            <span class="h-10 text-2xl">{{ total.commentCount }}</span>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card hoverable class="h-42 bg-hex-fef8ec text-$primary-color-hover dark:bg-hex-392f22">
          <div class="flex flex-col justify-between h-full">
            <span class="text-3xl font-700 h-10">收藏数量</span>
            <span class="h-10 text-2xl">{{ total.collectCount }}</span>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card hoverable class="h-42 bg-hex-fef8ec text-$primary-color-hover dark:bg-hex-392f22">
          <div class="flex flex-col justify-between h-full">
            <span class="text-3xl font-700 h-10">粉丝数量</span>
            <span class="h-10 text-2xl">{{ total.followCount }}</span>
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang='scss' scoped></style>