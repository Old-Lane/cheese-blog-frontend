<script setup lang='ts'>
import { FavoritesType } from '@/api/Favorites/type';
import { getUserCardInfoApi } from '@/api/user';
import { useRouter } from 'vue-router';
import { timeago } from '@/utils/time';
import { getFavoritesDetailApi } from '@/api/Favorites/index';
import Cookies from 'js-cookie';

const message: any = inject('message')
const dialog: any = inject('dialog')
const { push, currentRoute } = useRouter()
const favorites = ref<FavoritesType>({})
const pageInfo = ref({
  id: currentRoute.value.params.id,
  currentPage: '1',
  pageSize: '10'
})
const cardInfo = ref<UserCardType>({})
const userInfo = ref<UserType>(JSON.parse((Cookies.get('userInfo') || '{}')))

onMounted(() => {
  getFavorites()
})

// console.log(timeago(article.value.createTime));
const handleShowCard = (id: string) => {
  // console.log(id);
  getUserCardInfoApi(id).then(res => {
    cardInfo.value = res.data
  })
}

const getFavorites = () => {
  getFavoritesDetailApi(pageInfo.value).then(res => {
    favorites.value = res.data
  })
}

const toUserCenter = () => {
  push(`/space/${favorites.value.user?.id}`)
}

const toUserCenterCollection = () => {
  push(`/space/${favorites.value.user?.id}/collect`)
}

const deleteFavorites = () => {
  dialog.warning({
    title: '确定删除此收藏夹吗',
    content: '删除后此收藏夹将被移除',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      
    },
    onNegativeClick: () => {
      return
    }
  })
}

const editFavorites = () => {

}
</script>

<template>
  <div class="-mt-15px">
    <div class="w-full h-80 head text-white">
      <div class="w-920px h-full mx-auto flex items-center">
        <div class="w-full flex flex-col">
          <div>
            <div class="flex justify-between items-center">
              <span class="text-5xl h-15">{{ favorites.name }}</span>
              <div class="flex items-center">
                <n-button v-if="userInfo!.id != favorites.user?.id" color="#ffffff" class="w-30">
                  <span v-if="!favorites.isSubscribe" class="text-$primary-color-hover">订阅</span>
                  <span v-else class="text-$primary-color-hover">已订阅</span>
                </n-button>
                <div v-else class="flex text-2xl">
                  <div @click="editFavorites"
                    class="w-20 h-10 mr-5 flex items-center justify-center cursor-pointer rounded-1/10 hover:bg-gray-50 hover:text-$primary-color-hover">
                    编辑</div>
                  <div @click="deleteFavorites"
                    class="w-20 h-10 mr-5 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:text-$primary-color-hover">
                    删除</div>
                </div>
              </div>
            </div>
            <div class="my-5">{{ favorites.description }}</div>
          </div>
          <div class="flex items-center cursor-pointer mt-2">
            <div @click="toUserCenter" class="mr-3">
              <n-avatar :size="40" :src="favorites.user?.avatar" round />
            </div>
            <div class="flex flex-col">
              <span @click="toUserCenter" class="text-14px leading-9">{{ favorites.user?.nickname }}</span>
              <span @click="toUserCenterCollection" class="leading-8">查看更多收藏夹 &gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <n-card class="w-920px h-20 mx-auto">
        <div class="flex items-center">
          <span class="mr-5">{{ favorites.articleCount }} 篇文章</span>
          <div class="w-0.1px h-16px bg-gray-200 mr-5"></div>
          <span>{{ favorites.subscribeCount }} 订阅</span>
        </div>
      </n-card>
      <n-card class="w-920px min-h-150 mx-auto">
        <div v-if="favorites.articles?.length === 0">
          <div class="flex flex-col items-center">
            <SvgIcon name="empty" :size="250" />
            <span class="text-2xl text-gray-400">这里空空如也~</span>
          </div>
        </div>
        <div v-else v-for="article in favorites.articles">
          <div class="w-full h-58 py-5 flex justify-between items-center">
            <div class="w-80/100 h-full flex flex-col">
              <div @click="push(`/article/${article.id!}`)"
                class="font-700 text-3xl mb-3 cursor-pointer hover:text-$primary-color-hover">
                {{ article.title }}
              </div>
              <div class="h-1/2">
                <div class="summary">
                  {{ article.summary }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-gray-400 text-xl cursor-pointer">
                  <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
                    <template #trigger>
                      <div @mouseover="handleShowCard(article.userId!)" @click="push(`/space/${article.userId}`)"
                        class="flex items-center mr-5 text-gray-800 dark:text-gray-200 cursor-pointer">
                        <span class="mr-3">
                          <n-avatar round size="small" :src="article.user!.avatar" />
                        </span>
                        {{ article.author }}
                      </div>
                    </template>
                    <PopoverCard :cardInfo="cardInfo" />
                  </n-popover>

                  <div class="w-0.1px h-16px bg-gray-200 mr-5"></div>
                  <!-- <n-divider vertical /> -->
                  <span class="mr-5">{{ article.publishTime! }}</span>
                  <!-- <div class="w-0.1px h-16px bg-gray-200 mr-5"></div> -->
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
            <div class="w-19/100 h-full flex items-center ">
              <n-image @click="push(`/article/${article.id!}`)" class="w-full h-7/10 cursor-pointer" :src="article.cover"
                object-fit="cover" preview-disabled />
            </div>
          </div>
          <n-divider class="!my-1" />
        </div>
      </n-card>
    </div>
    <NewFavorites title="编辑收藏夹" :favorites="''"/>
  </div>
</template>

<style lang='scss' scoped>
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.head {
  background: url("src/assets/imgs/head.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 90%;
}
</style>