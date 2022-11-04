<script setup lang='ts'>
import { getArticleList } from '@/api/Article';
import { MenuOption } from 'naive-ui/es/menu/src/interface';
const a = ref('0')
const activeKey = ref<string>('all')
const search = ref('')

const menuOptions = ref<MenuOption[]>([
  {
    label: '全部 ' + a.value,
    key: 'all'
  },
  {
    label: '公开可见 ' + a.value,
    key: 'public'
  }
  , {
    label: '仅我可见 ' + a.value,
    key: 'private'
  }
  , {
    label: '审核 ' + a.value,
    key: 'audit'
  },
  {
    label: '草稿箱 ' + a.value,
    key: 'draft'
  },
  {
    label: '回收站 ' + a.value,
    key: 'deleted'
  }
])

let article = reactive({})

onMounted(() => {
  getArticleList(activeKey.value).then(res => {
    article = res.data
  })
})

const handleUpdateValue = (key: string, item: MenuOption) => {
  activeKey.value = key
}

</script>

<template>
  <div class="box flex justify-between items-center mt-2">
    <n-menu @update:value="handleUpdateValue" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <div>
      <n-input placeholder="搜索文章" v-model:value="search" class="w-200">
        <template #suffix>
          <span
            class="cursor-pointer hover:bg-gray-200 transition-all duration-300 w-12 h-12 rounded-1/5 flex items-center justify-center">
            <SvgIcon name="search" />
          </span>
        </template>
      </n-input>
    </div>
  </div>

</template>

<style lang='scss'>
.box .n-menu .n-menu-item-content {
  padding-left: 0 !important;
}
</style>