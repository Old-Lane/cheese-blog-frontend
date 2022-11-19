<script setup lang='ts'>
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { followUserApi, unfollowUserApi } from '@/api/user';

const { currentRoute, push } = useRouter()

const friends = ref({
  id: '1',
  avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202101%2F25%2F20210125183832_9d94c.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671475531&t=9a81319eea5f8cfa9e4782f74f4a7719',
  nickname: '旧巷',
  profile: '心之所向，素履以往心之所向，素履以往心之所向，素履以往心之所向，素履以往心之所向，素履以往',
  isFollowed: false
})

const followUser = () => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
  } else {
    followUserApi(friends.value.id!).then(res => {
      if (res.code === 200) {
        friends.value.isFollowed = true
      }
    })
  }
}
const UnfollowUser = () => {
  unfollowUserApi(friends.value.id!).then(res => {
    if (res.code === 200) {
      friends.value.isFollowed = false
    }
  })
}

</script>

<template>
  <div>
    <div v-for="item in 10">
      <div class="flex items-center justify-between h-30">
        <div class="flex items-center w-7/10">
          <div class="mr-8">
            <n-avatar round :src="friends.avatar" />
          </div>
          <div class="flex flex-col w-8/10">
            <div class="text-2xl font-600 mb-2">{{ friends.nickname }}</div>
            <div class="summary text-xl text-gray-400">{{ friends.profile }}</div>
          </div>
        </div>
        <div>
          <n-button size="small" v-if="!friends.isFollowed" @click="followUser" ghost type="warning" class="mr-5 w-30">＋关注</n-button>
          <n-button v-else @click="UnfollowUser" type="warning" ghost class="mr-5 w-35">已关注</n-button>
        </div>
      </div>
      <n-divider />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>