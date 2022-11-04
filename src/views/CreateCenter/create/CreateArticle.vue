<script setup lang='ts'>
import { draftApi, saveArticleApi } from '@/api/Article';
import { getCategoryListByUid } from '@/api/classify';
import { FormInst, FormItemRule, FormRules } from 'naive-ui/es/form/src/interface';

const message: any = inject('message')

const addType = ref('')
const addCType = ref('')
const category = ref([])
const tagList = ref([
  {
    id: '1',
    name: '前端',
    type: 'default'
  },
  {
    id: '2',
    name: '后端',
    type: 'default'
  },
  {
    id: '3',
    name: '大数据',
    type: 'default'
  }
])
const tagNameList = ref<string[]>([])

const article = reactive({
  title: '',
  content: '',
  summary: '',
  cover: '',
  tagIdList: <any>[],
  categoryName: null,
  permission: 0,
  source: <any>null,
  commentEnable: 1,
  status: <unknown>null
})

watch(
  () => category.value[0],
  newVal => {
    console.log(123);
    article.categoryName = newVal
  }
)



//用户的分类专栏
const categoryList = ref([
  {
    id: '1',
    name: '前端'
  },
  {
    id: '2',
    name: '后端'
  }
])

onMounted(() => {
  /* getCategoryListByUid().then(res => {
    categoryList.value = res.data
  }) */
})


const handleDelTag = (index: number, name: string) => {
  tagNameList.value.splice(index, 1)
  article.tagIdList.splice(index, 1)
  for (let i = 0; i < tagList.value.length; i++) {
    if (tagList.value[i].name === name) {
      tagList.value[i].type = 'default'
      break
    }
  }
}

const showSelector = ref(false)
const handleAddTag = () => {
  showSelector.value = true
}

const tagHandle = (index: number, name: string, id: string) => {
  if (tagList.value[index].type === 'default') {
    article.tagIdList.push(tagList.value[index].id)
    tagNameList.value.push(tagList.value[index].name)
  } else {
    for (let i = 0; i < article.tagIdList.length; i++) {
      if (article.tagIdList[i] === id) {
        article.tagIdList.splice(i, 1)
        tagNameList.value.splice(i, 1)
      }
    }
  }
  tagList.value[index].type = tagList.value[index].type === 'default' ? 'warning' : 'default'
}


const getContent = (content: string) => {
  article.content = content
}

//保存至草稿箱
const saveInDraft = () => {
  if (article.content === '') {
    message.warning('文章内容不能为空！')
  } else {
    article.status = 0
    saveArticleApi(article).then(res => {
      message.success(res.message)
    })
  }
}

const formRef = ref<FormInst | null>()
const rules: FormRules = {
  summary: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      return new Promise<void>((resolve, reject) => {
        if (value === '') {
          reject(Error('摘要不能为空'))
        } else {
          resolve()
        }
      })
    }
  },
  source: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      return new Promise<void>((resolve, reject) => {
        if (value === '') {
          reject(Error('请选择文章类型'))
        } else {
          resolve()
        }
      })
    }
  },
}

const saveArticle = () => {
  if (article.content === '') {
    message.warning('文章内容不能为空')
  } else {
    formRef.value?.validate((errors) => {
      if (!errors) {
        article.status = 2
        saveArticleApi(article).then(res => {
          message.success(res.message)
        })
      }
    })
  }
}



</script>

<template>
  <div class="mb-5 mt-3">
    <n-input placeholder="文章标题" v-model:value="article.title"></n-input>
  </div>

  <!-- <MdEditorV3 class="light:bg-$light-bg-color dark:bg-v-dark" /> -->
  <MdEditorV3 @getContent="getContent" />
  <n-card class="mt-5 createArticle-card">
    <n-form ref="formRef" :model="article" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging" :style="{ maxWidth: '640px' }" class="mb-40" :rules="rules">
      <n-form-item label="文章封面：" path="">
        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" list-type="image-card" :max="1"
          directory-dnd class="w-100" />
      </n-form-item>
      <n-form-item label="文章摘要：" path="summary" class="relative">
        <n-input :autosize="{
          minRows: 3,
          maxRows: 3
        }" type="textarea" v-model:value="article.summary" maxlength="256" show-count
          placeholder="摘要（必填）：会在推荐、列表等场景外露，帮助读者快速了解内容，支持一键将正文前 256 字符键入摘要文本框" />
        <n-button size="tiny" class="absolute right-5 bottom-2 text-xl">一健提取</n-button>
      </n-form-item>
      <n-form-item label="文章来源：" path="source">
        <n-space>
          <n-radio :checked="article.source === 0" value="public" name="basic-demo" @change="article.source = 0">
            原创
          </n-radio>
          <n-radio :checked="article.source === 1" value="private" name="basic-demo" @change="article.source = 1">
            转载
          </n-radio>
        </n-space>
      </n-form-item>
      <n-form-item label="文章标签：" path="">
        <n-space>
          <n-tag v-for="(tag, index) in tagNameList" type="warning" closable @close="handleDelTag(index, tag)">
            {{ tag }}
          </n-tag>

          <div class="relative">
            <div class="w-100vw h-100vh fixed z-0 top-0 left-0" v-if="showSelector" @click="showSelector = false"></div>
            <div
              class="w-130 min-h-50 z-10000 absolute bottom-12 left-0 light:bg-$light-card-color dark:bg-$dark-card-color rounded-lg"
              v-show="showSelector && article.tagIdList.length < 5" style="box-shadow: 0 0 30px rgb(0 0 0 / 10%);">
              <div class="py-2 text-center" style="border-bottom: 1px solid #efeff5;">标签</div>
              <div class="px-3 py-1">
                <n-scrollbar class="max-h-100" >
                  <n-space>
                  <n-tag v-for="(tag, index) in tagList" :type="tag.type" class="cursor-pointer"
                    @click="tagHandle(index, tag.name, tag.id)">
                    {{ tag.name }}
                  </n-tag>
                </n-space>
                </n-scrollbar>
                
              </div>

            </div>
            <n-tag v-if="article.tagIdList.length < 5" :type="addCType" @mouseenter="addCType = 'warning'"
              @mouseleave="addCType = ''" @click="handleAddTag" class="cursor-pointer relative">
              ＋添加文章标签
            </n-tag>
          </div>

        </n-space>

      </n-form-item>
      <n-form-item label="分类专栏：" path="">
        <div>
          <!-- <n-tag v-if="article.tagList.length < 5" :type="addType" @mouseenter="addType = 'warning'" @mouseleave="addType = ''"
            @click="handleAddTag" class="cursor-pointer">
            ＋新建分类专栏
          </n-tag> -->
          <!-- <n-tag>{{article.category[0]}}</n-tag> -->
          <n-dynamic-tags v-model:value="category" :max="1">
            <template #trigger="{ activate, disabled }">
              <n-button size="small" class="cursor-pointer" :disabled="disabled" :type="addType"
                @mouseenter="addType = 'warning'" @mouseleave="addType = ''" @click="activate()">
                ＋新建分类专栏
              </n-button>
            </template>
          </n-dynamic-tags>
          <div v-if="categoryList.length > 0" class="w-150 border-solid h-50 mt-5 px-5"
            style="border: 1px solid rgb(224, 224, 230)">
            <h1 class="text-xl  py-2" style="border-bottom: 1px solid rgb(224, 224, 230)">选择分类专栏</h1>
            <div class="mt-5">
              <n-radio-group v-model:value="article.categoryName" name="category">
                <n-space>
                  <n-radio v-for="categoryItem in categoryList" :key="categoryItem.id" :value="categoryItem.name">
                    {{ categoryItem.name }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </div>
          </div>
        </div>
      </n-form-item>
      <n-form-item label="能否评论：" path="">
        <n-space>
          <n-radio :checked="article.commentEnable === 1" value="private" name="basic-demo"
            @change="article.commentEnable = 1">
            能
          </n-radio>
          <n-radio :checked="article.commentEnable === 0" value="public" name="basic-demo"
            @change="article.commentEnable = 0">
            不能
          </n-radio>
        </n-space>
      </n-form-item>
      <n-form-item label="发布形式：" path="">
        <n-space>
          <n-radio :checked="article.permission === 0" value="public" name="basic-demo"
            @change="article.permission = 0">
            所有人可见
          </n-radio>
          <n-radio :checked="article.permission === 1" value="private" name="basic-demo"
            @change="article.permission = 1">
            仅我可见
          </n-radio>
        </n-space>
      </n-form-item>
      <n-space class="float-right">
        <n-button type="primary" @click="saveArticle">发布文章</n-button>
        <n-button @click="saveInDraft">暂存草稿</n-button>
      </n-space>
    </n-form>


  </n-card>

</template>

<style lang='scss'>
.n-input-word-count {
  margin-right: 80px;
}

.n-popover .n-popover__header {
  text-align: center;
}
</style>