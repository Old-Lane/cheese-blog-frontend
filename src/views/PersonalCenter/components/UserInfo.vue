<script setup lang='ts'>
import { followUserApi, unfollowUserApi } from '@/api/follow';

import SvgIcon from '@/components/SvgIcon.vue';
import { useEmitt } from '@/hook/web/useEmitt';
import { timeFormat } from '@/utils/time'
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const { currentRoute, push } = useRouter()

const user = ref<UserCardType>({})
const me = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')!) : {}

useEmitt({
  name: 'getUserInfo',
  callback: (data: any) => {
    user.value = data
  }
})

const followUser = () => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
  } else {
    followUserApi(user.value.id!).then(res => {
      if (res.code === 200) {
        user.value.isFollowed = true
      }
    })
  }
}

const UnfollowUser = () => {
  unfollowUserApi(user.value.id!).then(res => {
    if (res.code === 200) {
      user.value.isFollowed = false
    }
  })
}

const editProfile = () => {
  push('/setting')
}

const chatWith = () => {
  push('/chat')
}
</script>

<template>
  <n-card class="p-5">
    <div class="flex justify-between">
      <div class="flex w-7/10">
        <div class="mr-10">
          <n-avatar round :size="100" :src="user.avatar" />
        </div>
        <div class="flex flex-col w-6/10">
          <span class="pt-3 font-700 text-4xl mb-5 flex items-center">
            <span>{{ user.nickname }}</span>
            <span class="flex items-center ml-5">
              <SvgIcon size="18" name="male" v-if="user.sex === 1" />
              <SvgIcon size="18" name="female" v-if="user.sex === 0" />
            </span>
          </span>
          <span class="flex items-center text-gray-500 mb-2">
            <SvgIcon name="namecard" class="mr-3" />
            <div class="summary w-9/10">
              {{ user.profile }}
            </div>
          </span>
          <span class="flex items-center text-gray-500">
            <SvgIcon name="join-time" class="mr-3" />
            加入于&nbsp;{{ timeFormat(user.createTime!) }}
          </span>
        </div>
      </div>

      <div v-if="user.id !== me.id!" class="flex mt-10">
        <n-button v-if="!user.isFollowed" @click="followUser" type="warning" class="mr-5 w-35">＋关注</n-button>
        <n-button v-else @click="UnfollowUser" type="warning" ghost class="mr-5 w-35">已关注</n-button>
        <n-button type="warning" ghost class="w-35" @click="chatWith">私信</n-button>
      </div>
      <div v-else class="cursor-pointer">
        <n-button size="tiny" @click="editProfile">编辑资料</n-button>
      </div>
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