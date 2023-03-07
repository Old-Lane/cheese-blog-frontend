<script setup lang='ts'>
import { addFavoritesApi, getFavoritesApi } from '@/api/favorites';
import { FavoritesType } from '@/api/favorites/type';
import SvgIcon from '@/components/SvgIcon.vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const { push, currentRoute } = useRouter()

const message: any = inject('message')
const isLogin = ref(Cookies.get('token'))
const isShowModal = ref(false)
const newFavorites = ref<FavoritesType>({
  visibility: 1
})
const favorites = ref<Array<FavoritesType>>([])
const pageInfo = ref({
  userId: currentRoute.value.params.uid,
  currentPage: '1',
  pageSize: '5'
})

const rules = ref({
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入收藏夹名称'
  }
})

onMounted(() => {
  getFavorites()
})

const getFavorites = () => {
  getFavoritesApi(pageInfo.value).then(res => {
    favorites.value = [...res.data.records, ...favorites.value]
  })
}

const changeVisibility = (e: Event) => {
  newFavorites.value.visibility = parseInt((e.target as HTMLInputElement).value)
}

const addFavorites = () => {
  if (!Cookies.get('token')) {
    message.error('您没有权限进行此操作，请先登录')
  } else {
    addFavoritesApi(newFavorites.value).then(res => {
      message.success('新增收藏夹成功！')
      isShowModal.value = false
      favorites.value = []
      getFavorites()
      newFavorites.value = {
        visibility: 1
      }
    })
  }
}

const openModal = () => {
  if (!Cookies.get('token')) {
    message.error('请先登录')
  } else {
    isShowModal.value = true
  }
}

</script>

<template>
  <div class="collect">
    <n-card class="py-5">
      <div v-if="isLogin" class="flex justify-between items-center">
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
        <div v-else v-for="(item, index) in favorites" :key="item.id" class="mt-8 cursor-pointer">
          <div class="mb-2">
            <h1 class="flex items-center">
              <span class="font-700 mr-2 text-18px">{{ item.name }}</span>
              <SvgIcon v-if="item.visibility === 0" name="password" normal="#c2c8d1" />
            </h1>
            <p class="leading-normal py-3">{{ item.description }}</p>
            <div class="text-gray-400 flex items-center">
              <span>{{ item.updateTime }} 更新</span>
              <span class="mx-3">·</span>
              <span>{{ item.articleCount }}篇文章</span>
              <span class="mx-3">·</span>
              <span>{{ item.subscribeCount }}订阅</span>
            </div>
          </div>
          <n-divider v-show="index !== favorites.length - 1" />
        </div>
      </div>
    </n-card>
    <n-modal v-model:show="isShowModal" class="w-4/11" preset="card" title="新建收藏夹" size="huge" :bordered="false"
      :segmented="{
        content: 'soft',
        footer: 'soft'
      }">
      <div>
        <n-form ref="formRef" :model="newFavorites" :rules="rules" label-placement="left" label-width="auto"
          require-mark-placement="right-hanging" size="medium" :style="{
            maxWidth: '640px'
          }">
          <n-form-item label="名称" path="name">
            <n-input v-model:value="newFavorites.name" placeholder="请输入收藏夹名称" />
          </n-form-item>
          <n-form-item label="描述" path="description">
            <n-input type='textarea' rows="5" v-model:value="newFavorites.description" placeholder="请输入收藏夹描述（选填）" />
          </n-form-item>
        </n-form>
        <div class="flex flex-col">
          <div class="flex items-center mb-3">
            <n-radio :checked="newFavorites.visibility === 1" :value="1" @change="changeVisibility">公开</n-radio>
            <span class="text-gray-400 text-xl">当其他人关注此收藏夹后不可再更改为隐私</span>
          </div>
          <div class="flex items-center">
            <n-radio :checked="newFavorites.visibility === 0" :value="0" @change="changeVisibility">隐私</n-radio>
            <span class="text-gray-400 text-xl">仅自己可见此收藏夹</span>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="float-right">
          <n-button @click="isShowModal = false" strong secondary type="primary" class="mr-5 w-30">
            取消
          </n-button>
          <n-button @click="addFavorites" :disabled="!newFavorites.name" strong type="primary" class="w-30">确定</n-button>
        </div>
      </template>
    </n-modal>
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