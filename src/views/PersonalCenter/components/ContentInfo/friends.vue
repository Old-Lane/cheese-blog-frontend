<script setup lang='ts'>
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { getUserCardInfoApi } from '@/api/user';
import { followUserApi, getUserFollowsApi, unfollowUserApi } from '@/api/follow';
import { useEmitt } from '@/hook/web/useEmitt';
import Empty from '@/views/error/empty.vue';


const { currentRoute, push } = useRouter()

const friends = ref<Array<UserCardType>>([])

onMounted(() => {
  getData()
  getUserCardInfoApi(currentRoute.value.params.uid).then(res => {
    useEmitt().emitter.emit('getUserInfo', res.data)
  })
})

const getData = () => {
  getUserFollowsApi(currentRoute.value.params.uid).then(res => {
    friends.value = res.data
  })
}

const followUser = (user: UserCardType) => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
  } else {
    followUserApi(user.id!).then(res => {
      if (res.code === 200) {
        user.isFollowed = true
      }
    })
  }
}

const UnfollowUser = (user: UserCardType) => {
  unfollowUserApi(user.id!).then(res => {
    if (res.code === 200) {
      user.isFollowed = false
    }
  })
}

const toUserSpace = (id: string) => {
  getUserCardInfoApi(id).then(res => {
    useEmitt().emitter.emit('getUserInfo', res.data)
  })
  push(`/space/${id}`)
}
</script>

<template>
  <n-card>
    <div v-if="friends.length === 0" class="mb-10">
      <Empty messege="还没有关注噢" />
    </div>
    <div v-else v-for="item in friends">
      <div class="flex items-center justify-between h-30">
        <div class="flex items-center w-7/10">
          <div class="mr-8">
            <n-avatar round :src="item.avatar" />
          </div>
          <div class="flex flex-col w-8/10">
            <div @click="toUserSpace(item.id!)" class="text-2xl font-600 mb-2 cursor-pointer">{{ item.nickname }}</div>
            <div class="summary text-xl text-gray-400">{{ item.profile }}</div>
          </div>
        </div>
        <div>
          <n-button size="small" v-if="!item.isFollowed" @click="followUser(item)" ghost type="warning" class="mr-5 w-30">＋关注</n-button>
          <n-button v-else @click="UnfollowUser(item)" type="warning" ghost class="mr-5 w-35">已关注</n-button>
        </div>
      </div>
      <n-divider />
    </div>
  </n-card>
</template>

<style lang='scss' scoped>
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>