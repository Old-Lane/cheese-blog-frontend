<template>
  <!-- <n-layout-header></n-layout-header> -->
  <n-layout-header class=" h-66px flex items-center justify-between p-10 ">
    <!-- <n-menu class="" v-model:value="activeKey" mode="horizontal" :options="menuOptions" /> -->
    <div>
      <n-tabs type="line" animated>
        <n-tab name="主页" tab="主页" @click="toIndex"/>
        <n-tab name="动态" tab="动态" @click="push(`/${Cookies.get('uid')}/dynamic`)"/>
        <n-tab name="文章" tab="文章" />
        <n-tab name="收藏" tab="收藏" />
      </n-tabs>
    </div>
    <div class="table table-fixed text-center text-12px">
      <div class="table-cell px-4 cursor-pointer">
        <div class="text-12px">关注数</div>
        <div class="mt-5px">1</div>
      </div>
      <div class="table-cell px-4 cursor-pointer">
        <div class="">粉丝数</div>
        <div class="mt-5px">2</div>
      </div>
      <div class="table-cell px-4 cursor-pointer">
        <div class="">获赞数</div>
        <div class="mt-5px">3</div>
      </div>
      <div class="table-cell px-4 cursor-pointer">
        <div class="">阅读数</div>
        <div class="mt-5px">4</div>
      </div>
    </div>
  </n-layout-header>
</template>
<script setup lang="ts">
import Cookies from 'js-cookie';
import { MenuOption } from 'naive-ui/es/menu/src/interface';
import { useRouter } from 'vue-router';

const {push} = useRouter()

const activeKey = ref<string | null>(null)
const menuOptions = ref<MenuOption[]>([
  {
    label: '主页',
    key: 'pinball-1973',
  }, {
    label: '动态',
    key: 'pinball-1973',
  }, {
    label: '文章',
    key: 'pinball-1973',
  }, {
    label: '收藏',
    key: 'pinball-1973',
  },
])

const toIndex = () => {
  push(`/${Cookies.get('uid')}`)
}
</script>
<style>
.n-tabs .n-tabs-nav.n-tabs-nav--line-type .n-tabs-nav-scroll-content {
  border-bottom: none;
}
</style>