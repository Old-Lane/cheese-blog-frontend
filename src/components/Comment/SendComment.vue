<script setup lang='ts'>
import { sendCommentApi } from '@/api/Comment';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from 'pinia';
import {useEmitt} from '@/hook/web/useEmitt'

const { currentRoute, push } = useRouter()
const message: any = inject('message')

// const { getUser } = useUserStore()
const { user } = storeToRefs(useUserStore())


const comment = ref<CommentType>({
  articleId: currentRoute.value.params.id,
  parentId: '',
  rootParent: '',
  targetId: '',
  content: ''
})

const props = defineProps({
  parentId: {
    type: String,
    default: null
  },
  rootParent: {
    type: String,
    default: null
  },
  targetId: {
    type: String,
    default: null
  },
})

onMounted(() => {
  giveValue()
})

const giveValue = () => {
  comment.value.parentId = props.parentId
  comment.value.rootParent = props.rootParent
  comment.value.targetId = props.targetId
}

const handleFocus = () => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
    // console.log(currentRoute.value.path);
  }
}

//发送评论
const sendComment = () => {
  if (comment.value.content === '') {
    message.warning('你还没有评论~')
  } else {
    sendCommentApi(comment.value).then(res => {
      message.warning(res.message)
      comment.value.content = ''
      useEmitt().emitter.emit('refreshComment')
    })
  }
}

</script>

<template>
  <div>
    
    <div class="flex w-full justify-between items-center mb-5">
      <div class="w-1/12">
        <n-avatar round size="large" :src="user.avatar" v-if="user.avatar"
          fallback-src="https://img.ixintu.com/download/jpg/20210107/f907205dea2b81710a49c05a0afb9d0a_512_512.jpg!bg" />
          <n-avatar round size="large" v-else
          src="https://img.ixintu.com/download/jpg/20210107/f907205dea2b81710a49c05a0afb9d0a_512_512.jpg!bg" />
      </div>
      <div class="w-11/12">
        <n-input @focus="handleFocus" @keyup.ctrl.enter="sendComment" class="light:bg-$light-bg-color"
          v-model:value="comment.content" type="textarea" placeholder="您来讲两句（Enter换行，Ctrl + Enter发送）" :autosize="{
            minRows: 3,
            maxRows: 3
          }" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>