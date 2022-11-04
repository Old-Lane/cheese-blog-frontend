<script setup lang='ts'>
import { getArticleListApi } from '@/api/Article';
import { MenuOption } from 'naive-ui/es/menu/src/interface';
import { useRouter } from 'vue-router';

interface ArticleType {
  all: number,
  public: number,
  private: number,
  audit: number,
  draft: number,
  deleted: number
}

const {push} = useRouter()
const count = ref<ArticleType>({
  all: 0,
  public: 0,
  private: 0,
  audit: 0,
  draft: 0,
  deleted: 0
})
const activeKey = ref<string>('all')
const search = ref('')
const article = ref([])

const menuOptions = ref<MenuOption[]>([
  {
    label: '全部 ',
    key: 'all',
    name: '全部 '
  },
  {
    label: '公开可见 ',
    key: 'public',
    name: '公开可见 '
  }
  , {
    label: '仅我可见 ',
    key: 'private',
    name: '仅我可见 '
  }
  , {
    label: '审核 ',
    key: 'audit',
    name: '审核 '
  },
  {
    label: '草稿箱 ',
    key: 'draft',
    name: '草稿箱 '
  },
  {
    label: '回收站 ',
    key: 'recycle',
    name: '回收站 '
  }
])


onMounted(() => {
  getArticleList()
})


const handleUpdateValue = (key: string, item: MenuOption) => {
  activeKey.value = key
  getArticleList()
}

const getArticleList = () => {
  getArticleListApi(activeKey.value).then(res => {
    article.value = res.data.list
    const counts = res.data.count
    for (const key in counts) {
      for (let i = 0; i < menuOptions.value.length; i++) {
        const element = menuOptions.value[i];
        if (key === element.key) {
          element.label = element.name + counts[key]
        }
      }
    }
  })
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

  <div class="mt-25" v-if="article.length === 0">
    <n-result status="404" title="空空如也">
      <template #footer>
        <n-button type="primary" @click="push('/platform/create')">去写博客</n-button>
      </template>
    </n-result>
  </div>

  <div class="pt-5 pb-10" v-else>
    <div v-for="item in article" class="w-80% h-62 py-5 flex"
      style="border-bottom: rgba(221, 221, 221, 0.4) 1px solid;">
      <div v-if="item.cover" class="h-full w-28/100 pr-0">
        <n-image class="w-full h-full " :src="item.cover" object-fit="cover" />
      </div>
      <div class="w-full h-100% flex flex-col">
        <div class="flex justify-between mb-5">
          <div class="flex">
            <n-button text class="text-3xl mr-5">{{ item.title }}</n-button>
            <div class="flex justify-between">
              <n-tag v-if="item.status === 0" size="small" class="mr-2"> 草稿 </n-tag>
              <n-tag v-if="item.source === 0" size="small" type="warning"> 原创 </n-tag>
            </div>
          </div>
          <div class="text-xl text-gray-400">{{ item.createTime }}</div>
        </div>

        <div class="h-3/5 w-full">
          <div v-if="item.summary">
            {{ item.summary }}
          </div>
          <div v-else>
            暂未设置摘要
          </div>
          
        </div>
        <div class="flex justify-between">
          <div class="flex text-gray-400">
            <div class="mr-2">
              浏览 {{ item.views }}
            </div>
            •
            <div class="mx-2">
              评论 {{ item.commentCount }}
            </div>
            •
            <div class="mx-2">
              收藏 {{ item.collectCount }}
            </div>
            •
            <div class="mx-2">
              点赞 {{ item.likeCount }}
            </div>
          </div>
          <div class="flex w-45 justify-between">
            <n-button text>编辑</n-button>
            <n-button text>预览</n-button>
            <n-button text>删除</n-button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style lang='scss'>
.box .n-menu .n-menu-item-content {
  padding-left: 0 !important;
  // color: rgba(221, 221, 221, 0.659);
}
</style>