<script setup lang='ts'>
import { FavoritesType } from '@/api/favorites/type';
import { addFavoritesApi } from '@/api/favorites';
import Cookies from 'js-cookie';
import { useEmitt } from '@/hook/web/useEmitt';

const props = defineProps({
  title: {
    type: String,
    default: '新建收藏夹'
  },
  favorites: {
    default: ''
  }
})
const message: any = inject('message')
const isShowModal = ref(false)
const newFavorites = ref<FavoritesType>({
  visibility: 1
})
const rules = ref({
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入收藏夹名称'
  }
})

onMounted(() => {
  if (props.favorites !== '') {
    //@ts-ignore
    newFavorites.value = props.favorites
  }
})

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
      useEmitt().emitter.emit('refreshCollection')
      newFavorites.value = {
        visibility: 1
      }
    })
  }
}

useEmitt({
  name: 'openCollectionModal',
  callback: () => {
    isShowModal.value = true
  }
})

</script>

<template>
  <div>
    <n-modal v-model:show="isShowModal" class="w-4/11" preset="card" :title="props.title" size="huge" :bordered="false"
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

<style lang='scss' scoped>

</style>