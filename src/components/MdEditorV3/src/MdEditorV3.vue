<script setup lang='ts'>
import MdEditor, { ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import EmojiExtension from '@/components/MdEditorV3/src/EmojiExtension/index.vue';
import { saveArticleApi } from "@/api/Article";
import { useArticleStore } from "@/store/modules/article";
import { storeToRefs } from "pinia";

const message: any = inject('message')
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})


// const text = ref('# 这是标题')
const toolbars = ref<ToolbarNames[]>([
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  0,
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
]
)
const state = reactive({
  text: props.content,
  modalVisible: false,
  modalFullscreen: false
});

const emit = defineEmits(['getContent'])
const isSave = useArticleStore()

onMounted(() => {
})

watch(
  () => props.content,
  newVal => {
    state.text = newVal
  }
)

const onChange = (v: string) => {
  state.text = v
  emit('getContent', v)
}

const onUploadImg = (val : any) => {
}

//保存至草稿箱
const codeSave = () => {
  if (state.text === '') {
    message.warning('文章内容不能为空！')
  } else {
    saveArticleApi({ content: state.text }).then(res => {
      message.success(res.message)
      isSave.setIsSave(true)
    })
    isSave.setIsSave(true)
  }

}

const { content } = storeToRefs(useArticleStore())

watch(
  () => state.text,
  (newVal) => {
    content.value = newVal
  }
)

</script>

<template>
  <md-editor v-model="state.text" :toolbarsExclude="['github']" :toolbars='toolbars' @onChange="onChange"
    @onUploadImg="onUploadImg" class="!min-h-240" preview-theme="mk-cute" placeholder="开始创作吧！" @onSave="codeSave">
    <template #defToolbars>
      <EmojiExtension @on-change="onChange" />
    </template>
  </md-editor>
</template>

<style scoped>

</style>