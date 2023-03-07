<script setup lang='ts'>
import PanelGroup from './components/PanelGroup.vue';
import Analysis from './components/Analysis.vue';
import NewComment from './components/NewComment.vue';

</script>

<template>
  <div>
    <div class="mb-10">
      <PanelGroup />
    </div>

    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-card hoverable class="" style="width: 100% !important; height: 400px">
          <h1 class="text-2xl font-700 text-gray-500">十二个月发布文章统计</h1>
          <Analysis />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card hoverable class="" style="width: 100%; height: 400px">
          <h1 class="text-2xl font-700 text-gray-500">最新评论</h1>
          <NewComment />
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang='scss' scoped></style>  