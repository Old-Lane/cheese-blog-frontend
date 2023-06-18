<script setup lang='ts'>
import { addFavoritesApi, getFavoritesApi, subscribeFavoritesApi } from '@/api/Favorites/index';
import { FavoritesType } from '@/api/Favorites/type';
import { NewFavorites } from '@/components/NewFavorites';
import SvgIcon from '@/components/SvgIcon.vue';
import { useEmitt } from '@/hook/web/useEmitt';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const { push, currentRoute } = useRouter()
const message: any = inject('message')

const isMyHome = ref(JSON.parse((Cookies.get('userInfo') || '{}')).id === currentRoute.value.params.uid)

const favorites = ref<Array<FavoritesType>>([])
const pageInfo = ref({
  userId: currentRoute.value.params.uid,
  currentPage: '1',
  pageSize: '5'
})
const modalTitle = ref('新建收藏夹')
const tempFavorites = ref<FavoritesType>({})

onMounted(() => {
  getFavorites()
})

const getFavorites = () => {
  getFavoritesApi(pageInfo.value).then(res => {
    favorites.value = [...res.data.records, ...favorites.value]
  })
}

const toDetail = (id?: string) => {
  push(`/collection/${id}`)
}

const openModal = () => {
  if (!Cookies.get('token')) {
    message.error('请先登录')
  } else {
    useEmitt().emitter.emit('openCollectionModal')
  }
}

useEmitt({
  name: 'refreshCollection',
  callback: () => {
    favorites.value = []
    getFavorites()
  }
})

const subscribe = (id: string) => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
  } else {
    subscribeFavoritesApi(id).then(res => {
      message.success(res.message)
      favorites.value = []
      getFavorites()
    })
  }
}

</script>

<template>
  <div class="collect">
    <n-card class="py-5">
      <div v-if="isMyHome" class="flex justify-between items-center">
        <div class="w-80">
          <n-tabs type="segment">
            <n-tab name="chap1">
              <span>我创建的</span>
            </n-tab>
            <n-tab name="chap2">
              <span>我订阅的</span>
            </n-tab>
          </n-tabs>
        </div>
        <n-button @click="openModal" text type="primary">＋新建收藏夹</n-button>
      </div>
      <div>
        <div v-if="favorites.length === 0" class="flex justify-center py-20">
          <div class="flex flex-col items-center">
            <SvgIcon name="empty" :size="200" />
            <span class="text-2xl text-gray-400">这里空空如也~</span>
          </div>
        </div>
        <div v-else v-for="(item, index) in favorites" :key="item.id" @click="toDetail(item.id)"
          class="mt-8 cursor-pointer">
          <div class="flex justify-between items-center">
            <div class="mb-2">
              <h1 class="flex items-center">
                <span class="font-700 mr-2 text-18px">{{ item.name }}</span>
                <SvgIcon v-if="item.visibility === 0" name="password" normal="#c2c8d1" />
              </h1>
              <p class="leading-normal py-3">{{ item.description }}</p>
              <div class="text-gray-400 flex items-center">
                <span>{{ item.updateTime }} 更新</span>
                <span class="mx-3">·</span>
                <span>{{ item.articleCount }} 篇文章</span>
                <span class="mx-3">·</span>
                <span>{{ item.subscribeCount }} 订阅</span>
              </div>
            </div>
            <div v-if="!isMyHome" @click.stop="subscribe(item.id!)">
              <n-button v-if="!item.isSubscribe" ghost type="primary" class="w-30">订阅</n-button>
              <n-button color="#9ca3af" v-else ghost class="w-30">
                <span class="text-gray-400">退订</span>
              </n-button>
            </div>
          </div>
          <n-divider v-show="index !== favorites.length - 1" />
        </div>
      </div>
    </n-card>
    <NewFavorites :title="modalTitle" :favorites="''" />
  </div>
</template>

<style lang='scss'>
.n-card.n-card--content-segmented>.n-card__content:not(:first-child),
.n-card.n-card--content-soft-segmented>.n-card__content:not(:first-child) {
  border-top: 0px;
  padding-top: 0;
  padding-bottom: 0;
}

.n-card.n-card--footer-segmented>.n-card__footer:not(:first-child),
.n-card.n-card--footer-soft-segmented>.n-card__footer:not(:first-child) {
  border-top: 0px;
}
</style>