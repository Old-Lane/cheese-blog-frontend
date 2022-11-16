<script setup lang='ts'>
import { getCommentListApi } from '@/api/Comment';
import { getUserCardInfoApi } from '@/api/user';
import { useRouter } from 'vue-router';
import { timeago } from '@/utils/time';
import PopoverCard from '@/components/UserInfoCard/PopoverCard.vue';
import SvgIcon from "@/components/SvgIcon.vue";
import { useEmitt } from '@/hook/web/useEmitt'
import SendComment from './SendComment.vue';


const { currentRoute } = useRouter()

const commentSort = ref(0)
const commentList = ref<any>({})
const total = ref(0)
const cardInfo = ref<UserCardType>({})
const showSend = ref(false)
const showSubSend = ref(false)
const sendCommentIndex = ref(0)
const sendSubCommentIndex = ref(0)

const props = defineProps({
  authorId: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  nextTick(() => {
    getCommentList()
  })
})

const getCommentList = () => {
  getCommentListApi(currentRoute.value.params.id, commentSort.value).then(res => {
    commentList.value = res.data.records
    total.value = res.data.total
    console.log(res.data.records);
  })
}
const commentSortHandle = (value: number) => {
  commentSort.value = value
  getCommentList()
}

const handleShowCard = (id: string): any => {
  // console.log(id);
  getUserCardInfoApi(id).then(res => {
    cardInfo.value = res.data
  })
}

useEmitt({
  name: 'refreshComment',
  callback: () => {
    getCommentList()
    showSend.value = false
    showSubSend.value = false
  }
})

const getReply = (id: string, comments: any) => {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      return comments[i].content
    }
  }
}

</script>

<template>
  <div>
    <div class="flex justify-between items-center pb-2">
      <div class="flex items-center">
        <span class="font-700 text-3xl mr-3">全部评论</span>
        <span class="">{{ total }}</span>
      </div>
      <div>
        <n-tabs type="segment" class="" size="small" :animated="true" @update:value="commentSortHandle">
          <n-tab :name="0" class="flex items-center ">
            <SvgIcon name="time" size="13" class="mr-1" />
            <span class="">最新</span>
          </n-tab>
          <n-tab :name="1" class="flex items-center">
            <SvgIcon name="hot" size="13" class="mr-1" />
            <span>最热</span>
          </n-tab>
        </n-tabs>
      </div>
    </div>
    <div class="w-full flex justify-between py-5" v-for="(item, i) in commentList" key="i">
      <div class="mr-5 ">
        <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
          <template #trigger>
            <n-avatar @mouseover="handleShowCard(item.user.id)" class="cursor-pointer" round size="large"
              :src="item.user.avatar" />
          </template>
          <PopoverCard :cardInfo="cardInfo" />
        </n-popover>
      </div>
      <div class="w-full h-full bg-pink-0 flex flex-col">
        <div class="py-2 flex justify-between items-center">
          <div class="flex items-center">
            <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
              <template #trigger>
                <div>
                  <span @mouseover="handleShowCard(item.user.id)" class="text-1.5rem cursor-pointer">{{
                      item.user.nickname
                  }}</span>
                </div>
              </template>
              <PopoverCard :cardInfo="cardInfo" />
            </n-popover>
            <n-tag v-if="item.user.id === authorId" size="small" class=" h-6 text-lg px-1 ml-5" type="warning">
              作者
            </n-tag>
          </div>
          <div class="text-gray-400">{{ timeago(item.createTime) }}</div>
        </div>
        <div class="py-3">
          {{ item.content }}
        </div>
        <div class="flex items-center text-gray-400 pb-6">
          <span class="cursor-pointer mr-8 hover:text-$primary-color-hover">
            <SvgIcon name="like-count" class="mr-2" />
            <span v-if="item.likeCount > 0">{{ item.likeCount }}</span>
            <span v-else>点赞</span>
          </span>
          <span @click="showSend = !showSend; sendCommentIndex = i" class="cursor-pointer hover:text-$primary-color-hover">
            <SvgIcon name="comment-count" class="mr-2" />
            <span v-if="item.children">{{ item.children.length }}</span>
            <span v-else>评论</span>
          </span>
        </div>
        <SendComment :rootParent="item.id" :parentId="item.id" :targetId="item.user.id" v-if="showSend && sendCommentIndex === i"/>
        <div class="bg-$comment-children-color dark:bg-$dark-card-color p-6 rounded-md"
          v-if="item.children && item.children.length > 0">
          <div class="w-full flex justify-between py-3" v-for="(child, index) in item.children" key="index">
            <div class="mr-5">
              <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
                <template #trigger>
                  <n-avatar @mouseover="handleShowCard(child.user.id)" class="cursor-pointer" round size="small"
                    :src="child.user.avatar" />
                </template>
                <PopoverCard :cardInfo="cardInfo" />
              </n-popover>
            </div>
            <div class="w-full h-full bg-pink-0 flex flex-col">
              <div class="py-2 flex justify-between items-center">
                <div class="flex items-center">
                  <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
                    <template #trigger>
                      <span @mouseover="handleShowCard(child.user.id)" class="text-1.5rem cursor-pointer">{{
                          child.user.nickname
                      }}</span>
                    </template>
                    <PopoverCard :cardInfo="cardInfo" />
                  </n-popover>
                  <n-tag v-if="child.user.id === authorId" size="small" class=" h-6 text-lg px-1 ml-5" type="warning">
                    作者
                  </n-tag>
                  <div v-if="child.parentId !== item.id" class="flex items-center">
                    <span class="mx-5 text-gray-400">回复</span>
                    <n-popover trigger="hover" width="250" :show-arrow="true" :delay="300" :duration="200">
                      <template #trigger>
                        <span @mouseover="handleShowCard(child.toUser.id)" class="text-1.5rem cursor-pointer">{{
                            '@' + child.toUser.nickname
                        }}</span>
                      </template>
                      <PopoverCard :cardInfo="cardInfo" />
                    </n-popover>
                    <!-- <span class="text-1.5rem">{{ child.toUser.nickname }}</span> -->
                  </div>
                </div>
                <span class="text-gray-400">{{ timeago(child.createTime) }}</span>
              </div>
              <div class="py-3">
                <div>
                  {{ child.content }}
                </div>
                <p v-if="child.parentId !== item.id" style="border: 1px solid #e4e6eb;"
                  class="px-4 flex border rounded-md border-solid dark:border-red-400 bg-$comment-reply-bgcolor dark:bg-dark-50 h-15 leading-tight-15 mt-5 text-gray-400">
                  “
                  <span class="summary">
                  {{ getReply(child.parentId, item.children) }}
                  </span>
                  ”
                </p>
              </div>
              <div class="flex items-center text-gray-400 pb-3">
                <span class="cursor-pointer mr-8 hover:text-$primary-color-hover">
                  <SvgIcon name="like-count" class="mr-2" />
                  <span v-if="child.likeCount > 0">{{ child.likeCount }}</span>
                  <span v-else>点赞</span>
                </span>
                <span @click="sendSubCommentIndex = index; showSubSend = !showSubSend" class="cursor-pointer hover:text-$primary-color-hover">
                  <SvgIcon name="comment-count" class="mr-2" />
                  <span>评论</span>
                </span>
              </div>
              <SendComment :rootParent="item.id" :parentId="child.id" :targetId="child.user.id" v-if="sendSubCommentIndex === index && showSubSend"/>
            </div>
          </div>
        </div>
      </div>
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