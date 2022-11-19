<script setup lang='ts'>
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { followUserApi, unfollowUserApi } from '@/api/user';

const { currentRoute, push } = useRouter()

const props = defineProps({
  cardInfo: {
    type: Object,
    default: {
      id: '',
      avatar: '',
      nickname: '',
      fans: '',
      friends: '',
      isFollowed: false
    }
  }
})

const followUser = () => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
  } else {
    followUserApi(props.cardInfo.id!).then(res => {
      if (res.code === 200) {
        props.cardInfo.isFollowed = true
      }
    })
  }
}

const UnfollowUser = () => {
  unfollowUserApi(props.cardInfo.id!).then(res => {
    if (res.code === 200) {
      props.cardInfo.isFollowed = false
    }
  })
}

</script>

<template>
  <div>
    <div @click="push(`/space/${cardInfo.id}`)" class="flex items-center mb-5 cursor-pointer">
      <span class="mr-4">
        <n-avatar round size="large" :src="cardInfo.avatar" />
      </span>
      <span class="font-600 text-2xl">
        {{ cardInfo.nickname }}
      </span>
    </div>
    <div class="flex items-center justify-center">
      <n-button @click="followUser" v-if="!cardInfo.isFollowed" type="primary" class="mr-8 w-35">关注</n-button>
      <n-button @click="UnfollowUser" v-else type="primary" ghost class="mr-8 w-35">已关注</n-button>
      <n-button ghost type="primary" class=" w-35">私信</n-button>
    </div>
    <n-divider class="!my-5" />
    <div class="flex items-center justify-center">
      <div class="flex flex-col text-2xl items-center cursor-pointer mr-30">
        <span class="mb-2">{{cardInfo.friends}}</span>
        <span class="text-gray-500">关注</span>
      </div>
      <div class="flex flex-col text-2xl items-center cursor-pointer">
        <span class="mb-2">{{cardInfo.fans}}</span>
        <span class="text-gray-500">粉丝</span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>