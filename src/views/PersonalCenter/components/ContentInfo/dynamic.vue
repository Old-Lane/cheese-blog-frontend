<script setup lang='ts'>
import { getUserCardInfoApi } from '@/api/user';
import SvgIcon from '@/components/SvgIcon.vue';
import { useEmitt } from '@/hook/web/useEmitt';
import { timeago } from '@/utils/time';
import { useRouter } from 'vue-router';
const { currentRoute, push } = useRouter()

const user = ref<UserCardType>({})
const dynamic = ref({
  likeCount: '0',
  commentCount: '2',
  content: '不论你在什么时候开始，重要的是开始之后就不要停止;不论你在什么时候结束，重要的是结束之后就不要悔恨!不去耕耘 ，不去播种，再肥的沃土也长不出庄稼，不去奋斗，不去创造，再美的青春也结不出硕果。',
  createTime: '2022-11-21 00:00:00'
})

onMounted(() => {
  getUserCardInfoApi(currentRoute.value.params.uid).then(res => {
    useEmitt().emitter.emit('getUserInfo', res.data)
  })
})

useEmitt({
  name: 'getUserInfo',
  callback: (data: any) => {
    user.value = data
  }
})

</script>

<template>
  <div class="w-full">
    <n-card v-for="item in 10" class="w-full mb-3">
      <div class="min-h-30 flex my-5 w-full">
        <div class="mr-5">
          <n-avatar :size="48" :src="user.avatar" round />
        </div>
        <div class="flex flex-col">
          <div class="flex justify-between pt-2">
            <div class="flex flex-col">
              <span class="text-2xl mb-1">{{ user.nickname }}</span>
              <span class="text-gray-400 text-xl mb-2">{{ timeago(dynamic.createTime) }}</span>
            </div>
            <div >
              <SvgIcon size="20" name="more" class="text-gray-300 hover:text-$primary-color-hover cursor-pointer"/>
            </div>
          </div>

          <div class="mb-3">
            {{ dynamic.content }}
          </div>
          <div class="flex justify-between items-center w-1/3 text-gray-400 text-xl">
            <span class="flex items-center cursor-pointer hover:text-$primary-color-hover">
              <SvgIcon name="share-count" class="mr-2" />
              <!-- <span>2</span> -->
              分享
            </span>
            <span class="flex items-center cursor-pointer hover:text-$primary-color-hover">
              <SvgIcon name="comment-count" class="mr-2" />
              <span v-if="parseInt(dynamic.commentCount) > 0">{{ dynamic.commentCount }}</span>
              <span v-else>评论</span>
            </span>
            <span class="flex items-center cursor-pointer hover:text-$primary-color-hover">
              <SvgIcon name="like-count" class="mr-2" />
              <span v-if="parseInt(dynamic.likeCount) > 0">{{ dynamic.likeCount }}</span>
              <span v-else>点赞</span>
            </span>
          </div>
        </div>
      </div>
    </n-card>
  </div>

</template>

<style lang='scss' scoped>

</style>