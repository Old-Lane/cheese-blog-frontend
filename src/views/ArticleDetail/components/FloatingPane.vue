<script setup lang='ts'>
import SvgIcon from '@/components/SvgIcon.vue';
import { useEmitt } from '@/hook/web/useEmitt';

const countInfo = ref({
  likeCount: 0,
  commentCount: 0,
  collectCount: 0
})

useEmitt({
  name: 'PaneInfo',
  callback: (data: any) => {
    countInfo.value = data
  }
})

</script>

<template>
  <div class="flex flex-col floating-pane">
    <n-badge :value="countInfo.likeCount" :max="1000" color="#c2c8d1">
      <div style="box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);"
        class="bg-white w-19 h-19 rounded-1/2 cursor-pointer flex items-center justify-center mb-8">
        <SvgIcon name="like" size="23" normal="#8a919f" hover="#515767" class="" />
      </div>
    </n-badge>

    <n-badge :value="countInfo.commentCount" :max="1000" color="#c2c8d1">
      <div style="box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);"
        class="bg-white w-19 h-19 rounded-1/2 cursor-pointer flex items-center justify-center mb-8">
        <SvgIcon name="comment" size="23" normal="#8a919f" hover="#515767" class="" />
      </div>
    </n-badge>
    <n-badge :value="countInfo.collectCount" :max="1000" color="#c2c8d1">
      <div style="box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);"
        class="bg-white w-19 h-19 rounded-1/2 cursor-pointer flex items-center justify-center mb-8">
        <SvgIcon name="collect" size="23" normal="#8a919f" hover="#515767" class="" />
      </div>
    </n-badge>
  </div>
</template>

<style lang='scss' scoped>

</style>
<style>
.floating-pane .n-badge .n-badge-sup {
  bottom: calc(100% - 19px);
}
</style>