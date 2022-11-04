<script setup lang='ts'>
import { draftApi, saveArticleApi } from '@/api/Article';
import { getCategoryListApi, getCategoryListByUid } from '@/api/classify';
import { TagSelector } from '@/components/TagSelector';
import { useArticleStore } from '@/store/modules/article';
import { FormInst, FormItemRule, FormRules } from 'naive-ui/es/form/src/interface';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

const message: any = inject('message')
const dialog: any = inject('dialog')

const addType = ref('')
const category = ref([])

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

//用户的分类专栏
const categoryList = ref([])
const isSave = useArticleStore()
watch(
  () => category.value[0],
  newVal => {
    article.categoryName = newVal
  }
)

onMounted(() => {
  getCategoryListApi().then(res => {
    categoryList.value = res.data
  })
  window.addEventListener("beforeunload", tip, false)
})

const tip = (event: any) => {
  if (article.content !== '' && !isSave.getIsSave) {
    event.returnValue = '未保存'
  } else {
    return false
  }
}


const getTagIdList = (idList: any) => {
  article.tagIdList = idList
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
    console.log(222);
    saveArticleApi(article).then(res => {
      message.success(res.message)
      isSave.setIsSave(true)
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
          isSave.setIsSave(true)
        })
      }
    })
  }
}

onBeforeRouteLeave((to, from, next) => {
  if (article.content !== '' && !isSave.getIsSave) {
    dialog.warning({
      title: '警告',
      content: '文章已编辑且尚未保存，您确定要离开嘛',
      positiveText: '确定',
      negativeText: '我再看看',
      onPositiveClick: () => {
        next()
      },
      onNegativeClick: () => {
        return
      }
    })
  } else {
    next()
  }
})




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
        <TagSelector @getTagIdList="getTagIdList" />
      </n-form-item>
      <n-form-item label="分类专栏：" path="">
        <div>
          <n-dynamic-tags v-model:value="category" :max="1" type="warning">
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
              <n-radio-group v-model:value="category[0]" name="category">
                <n-space>
                  <n-radio v-for="categoryItem in categoryList" :key="categoryItem" :value="categoryItem">
                    {{ categoryItem }}
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