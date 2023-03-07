<script setup lang='ts'>
import { listAllApi } from '@/api/Article';
import { getUserCardInfoApi } from '@/api/user';
import SvgIcon from '@/components/SvgIcon.vue'
import PopoverCard from '@/components/UserInfoCard/PopoverCard.vue';
import { useEmitt } from '@/hook/web/useEmitt';
import { timeago } from '@/utils/time'
import { useRouter } from 'vue-router';

const { push } = useRouter()

/* const article = ref({
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
}) */

const article = ref<Array<Article>>([])
const loading = ref(true)

const tagInfo = ref<any>([])
const avatarList = ref<any>([])

const cardInfo = ref<UserCardType>({})

// console.log(timeago(article.value.createTime));
const handleShowCard = (id: string) => {
  // console.log(id);
  getUserCardInfoApi(id).then(res => {
    cardInfo.value = res.data
  })
}

useEmitt({
  name: 'listArticle',
  callback: (data: any) => {
    listAllApi(data.sort, data.page, data.pageSize, data.uid).then(res => {
      // console.log(res);
      article.value = res.data.records[0].article
      tagInfo.value = res.data.records[0].tagInfo
      avatarList.value = res.data.records[0].avatar
      loading.value = false
    })
  }
})



</script>

<template>
  <div class="w-full">
    <div v-if="loading">
      <n-skeleton text style="width: 20%; margin-top: 15px;" />
      <n-skeleton text :repeat="2" />
      <n-skeleton text style="width: 60%" />
    </div>
    <div v-for="(item, index) in article" key="index">
      <div class="w-full h-58 py-5 flex justify-between items-center">
        <div class="w-80/100 h-full flex flex-col">
          <div @click="push(`/article/${item.id!}`)"
            class="font-700 text-3xl mb-3 cursor-pointer hover:text-$primary-color-hover">
            {{ item.title }}
          </div>
          <div class="h-1/2">
            <div class="summary">
              {{ item.summary }}
            </div>
          </div>
          <div class="flex items-center  justify-between">
            <div class="flex items-center text-gray-400 text-xl cursor-pointer">
              <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
                <template #trigger>
                  <div @mouseover="handleShowCard(item.userId!)" @click="push(`/space/${item.userId}`)"
                    class="flex items-center mr-5 text-gray-800 dark:text-gray-200 cursor-pointer">
                    <span class="mr-3">
                      <n-avatar round size="small" :src="avatarList[index]" />
                    </span>
                    {{ item.author }}
                  </div>
                </template>
                <PopoverCard :cardInfo="cardInfo" />
              </n-popover>

              <div class="w-0.1px h-16px bg-gray-200 mr-5"></div>
              <!-- <n-divider vertical /> -->
              <span class="mr-5">{{ timeago(item.publishTime!) }}</span>
              <div class="w-0.1px h-16px bg-gray-200 mr-5"></div>
              <div>
                <span v-for="(tag, index2) in tagInfo[index]" key="index2">
                  <span @click="push(`/tag/${tag.name}`)" class="hover:text-orange-300">
                    {{ tag.name }}
                  </span>
                  <span v-if="index2 !== tagInfo[index].length - 1">
                    ·
                  </span>
                </span>
              </div>
            </div>
            <div class="flex items-center text-gray-400 text-xl mr-10">
              <div class="flex items-center mr-5 cursor-default">
                <SvgIcon name="view-count" size="14" />
                <span>&nbsp{{ item.views }}</span>
              </div>
              <div class="flex items-center mr-5 cursor-default">
                <SvgIcon name="like-count" size="14" />
                <span>&nbsp{{ item.likeCount }}</span>
              </div>
              <div class="flex items-center cursor-default">
                <SvgIcon name="comment-count" size="14" />
                <span>&nbsp{{ item.commentCount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-19/100 h-full flex items-center ">
          <n-image @click="push(`/article/${item.id!}`)" class="w-full h-7/10 cursor-pointer" :src="item.cover"
            object-fit="cover" preview-disabled />
        </div>
      </div>
      <n-divider />
    </div>

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