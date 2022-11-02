<template>
  <dropdown-toolbar title="emoji" :visible="state.visible" @on-change="onChange">
    <template #overlay>
      <div class="emoji-container">
        <ol class="emojis">
          <li
              v-for="(emoji, index) of emojis"
              :key="`emoji-${index}`"
              @click="emojiHandler(emoji)"
              v-text="emoji"
          ></li>
        </ol>
      </div>
    </template>
    <template #trigger>
        <SvgIcon name="emoji" :size="18" class="mt-1"/>
    </template>
  </dropdown-toolbar>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { PropType } from 'vue';
import { emojis } from './data';
import MdEditor  from "md-editor-v3"

const DropdownToolbar = MdEditor.DropdownToolbar

const props = defineProps({
  editorId: {
    type: String as PropType<string>,
    default: ''
  }
});
const emit = defineEmits(['onChange']);
const state = reactive({
  visible: false
});
const emojiHandler = (emoji: string) => {
  // 获取输入框
  const textarea = document.querySelector(
      `#md-editor-v3-textarea`
  ) as HTMLTextAreaElement;
  // 获取选中的内容
  const selection = window.getSelection()?.toString();
  // 获取鼠标位置
  const endPoint = textarea.selectionStart;
  // 根据鼠标位置分割旧文本
  // 前半部分
  const prefixStr = textarea.value.substring(0, endPoint);
  // 后半部分
  const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));
  console.log(`${prefixStr}${emoji}${suffixStr}`)
  emit('onChange', `${prefixStr}${emoji}${suffixStr}`);
  setTimeout(() => {
    textarea.setSelectionRange(endPoint, endPoint + 1);
    textarea.focus();
  }, 0);
};
const onChange = (visible: boolean) => {
  state.visible = visible;
};
</script>

<script lang="ts" >
export default {
  name: 'EmojiExtension'
};
</script>
<style lang="scss">
.emoji-container {
  border-radius: 3px;
  border: 1px solid #e6e6e6;
}

.emojis {
  position: relative;
  width: 363px;
  margin: 10px;
  padding: 0;
  background-color: #fff;

li {
  cursor: pointer;
  float: left;
  border: 1px solid #e8e8e8;
  height: 34px;
  width: 34px;
  overflow: hidden;
  margin: -1px 0 0 -1px;
  padding: 4px 2px;
  text-align: center;
  list-style: none;
  z-index: 11;

&:hover {
   position: relative;
   border: 1px solid #63a35c;
   z-index: 12;
 }
}

&::after {
   content: '';
   clear: left;
   display: block;
 }

* {
  user-select: none;
}
}
</style>