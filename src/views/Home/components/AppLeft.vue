<script setup lang="ts">
import { getUserCardInfoApi } from '@/api/user';
import SvgIcon from '@/components/SvgIcon.vue'
import PopoverCard from '@/components/UserInfoCard/PopoverCard.vue';
import { timeago } from '@/utils/time'

const article = ref({
  audit: 1,
  author: "旧巷",
  categoryName: "测试",
  collectCount: "0",
  commentCount: "0",
  commentEnable: 1,
  content: null,
  cover: "https://pic2.zhimg.com/80/v2-6acddc0e1cbda6f6fdf5eb12a6978e71_720w.webp",
  createTime: "2022-11-02 11:07:27",
  id: "1587884108149706754",
  likeCount: "0",
  permission: 0,
  publishTime: "2022-11-13 15:05:32",
  source: 1,
  status: 2,
  summary: "异步执行对于开发者来说并不陌生，在实际的开发过程中，很多场景多会使用到异步，相比同步执行，异步可以大大缩短请求链路耗时时间，比如：发送短信、邮件、异步更新等，这些都是典型的可以通过异步实现的场景。",
  tagIdList: ["1", "2"],
  title: "测试发布文章",
  top: 0,
  updateTime: "2022-11-07 17:05:32",
  userId: "1",
  views: "0",
  tagInfo: ['java', 'html', 'vue']
})
const cardInfo = ref<UserCardType>({})

// console.log(timeago(article.value.createTime));
const handleShowCard = (id: string) => {
  // console.log(id);
  getUserCardInfoApi(id).then(res => {
    cardInfo.value = res.data
  })
}

</script>

<template>
  <div class="home-app-right">
    <transition name="zoom-fade" mode="in-out">
      <n-card class="">
        <n-tabs type="line">
          <n-tab name="推荐">
            推荐
          </n-tab>
          <n-tab name="全部">
            全部
          </n-tab>
          <n-tab name="最新">
            最新
          </n-tab>
        </n-tabs>
        <div class="w-full">
          <div v-for="item in 10">
            <div class="w-full h-60 py-5 flex justify-between items-center">
              <div class="w-80/100 h-full flex flex-col">
                <div class="font-700 text-3xl mb-5 cursor-pointer hover:text-$primary-color-hover">
                  {{ article.title }}
                </div>
                <div class="h-1/2">
                  <div class="summary">
                    {{ article.summary }}
                  </div>
                </div>
                <div class="flex items-center  justify-between">
                  <div class="flex items-center text-gray-400 text-xl cursor-pointer">
                    <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
                      <template #trigger>
                        <div class="flex items-center mr-5 text-gray-800 dark:text-gray-200 cursor-pointer">
                          <span class="mr-3">
                            <n-avatar @mouseover="handleShowCard(article.userId)" round size="small"
                              src="https://pic1.zhimg.com/80/v2-a87c97979ac7396fef8bff8b462267b4_720w.webp" />
                          </span>
                          {{ article.author }}
                        </div>
                      </template>
                      <PopoverCard :cardInfo="cardInfo"/>
                    </n-popover>

                    <div class="w-0.1px h-16px bg-gray-200 mr-5"></div>
                    <!-- <n-divider vertical /> -->
                    <span class="mr-5">{{ timeago(article.publishTime) }}</span>
                    <div class="w-0.1px h-16px bg-gray-200 mr-5"></div>
                    <div>
                      <span v-for="(item, index) in article.tagInfo">
                        <span class="hover:text-orange-300">
                          {{ item }}
                        </span>
                        <span v-if="index !== article.tagInfo.length - 1">
                          ·
                        </span>
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center text-gray-400 text-xl mr-10">
                    <div class="flex items-center mr-5 cursor-default">
                      <SvgIcon name="view-count" size="14" />
                      <span>&nbsp{{ article.views }}</span>
                    </div>
                    <div class="flex items-center mr-5 cursor-default">
                      <SvgIcon name="like-count" size="14" />
                      <span>&nbsp{{ article.likeCount }}</span>
                    </div>
                    <div class="flex items-center cursor-default">
                      <SvgIcon name="comment-count" size="14" />
                      <span>&nbsp{{ article.commentCount }}</span>
                    </div>
                  </div>
                </div>

              </div>
              <div class="w-19/100 h-full flex items-center">
                <n-image class="w-full h-7/10" :src="article.cover" object-fit="cover" />
              </div>
            </div>
            <n-divider />
          </div>
          
        </div>
      </n-card>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

<style lang="scss">
.home-app-right .n-card>.n-card__content:first-child,
.n-card>.n-card__footer:first-child {
  padding-top: 0.1rem;
}

.home-app-right .n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>