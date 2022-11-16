<script setup lang='ts'>
import { getArticleListApi } from '@/api/Article';
import { MenuOption } from 'naive-ui/es/menu/src/interface';
import { useRouter } from 'vue-router';

const { push } = useRouter()
const count = ref<ArticleType>({})
const activeKey = ref<string>('all')
const search = ref('')
const article = ref<Article[]>([])
const pageNum = ref(1)
const pageSize = ref(10)
const pageCount = ref<number>(0)
const total = ref<number>(0)

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
  getArticleList(pageSize.value, pageNum.value)
})


const handleUpdateValue = (key: string, item: MenuOption) => {
  activeKey.value = key
  getArticleList(pageSize.value, pageNum.value)
}

const getArticleList = (ps: number, pn: number) => {
  getArticleListApi(activeKey.value, ps, pn).then(res => {
    article.value = res.data.list
    pageCount.value = res.data.pageInfo.pages
    pageNum.value = pn
    pageSize.value = ps
    total.value = res.data.pageInfo.total
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

const edit = (id: string | undefined) => {
  push(
    {
      name: 'Editor',
      params: {
        id: id
      }
    })
}

const toArticleDetail = (id: string | undefined) => {
  push({
    name: 'ArticleDetail',
    params: {
      id: id
    }
  })
}

//分页
const pageArticle = (page: number) => {
  getArticleList(pageSize.value, page)
}
const pageSizeArticle = (pageSize: number) => {
  getArticleList(pageSize, pageNum.value)
}


</script>

<template>
  <div class="flex mt-2 box justify-between items-center">
    <n-menu @update:value="handleUpdateValue" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <div>
      <n-input placeholder="搜索文章" v-model:value="search" class="w-200">
        <template #suffix>
          <span
            class="cursor-pointer flex rounded-1/5 h-12 transition-all w-12 duration-300 items-center justify-center hover:bg-gray-200">
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
    <div v-for="item in article" class="flex h-62 py-5 w-80%"
      style="border-bottom: rgba(221, 221, 221, 0.4) 1px solid;">
      <div v-if="item.cover" class="h-full pr-0 w-26/100">
        <n-image class="h-full w-90" :src="item.cover" object-fit="cover" />
      </div>
      <div class="flex flex-col h-100% w-full">
        <div class="flex mb-5 justify-between">
          <div class="flex">
            <n-button @click="edit(item.id)" text class="mr-5 text-3xl">{{ item.title }}</n-button>
            <div class="flex justify-between">
              <n-tag v-if="item.status === 0" size="small" class="mr-2"> 草稿 </n-tag>
              <n-tag v-if="item.source === 0" size="small" type="warning"> 原创 </n-tag>
              <n-tag v-if="item.audit === 0" size="small" type="warning"> 审核中 </n-tag>
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
            <n-button text @click="edit(item.id)">编辑</n-button>
            <n-button text @click="toArticleDetail(item.id)">预览</n-button>
            <n-button text>删除</n-button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10" v-if="total >= pageSize">
      <n-pagination v-model:page="pageNum" v-model:page-size="pageSize" :page-count="pageCount" show-size-picker
        :page-sizes="[5, 10, 20, 30, 40]" :on-update:page="pageArticle" :on-update:page-size="pageSizeArticle" />
    </div>
  </div>
</template>

<style lang='scss'>
.box .n-menu .n-menu-item-content {
  padding-left: 0 !important;
  // color: rgba(221, 221, 221, 0.659);
}
</style>