<script setup lang="ts">
import { useRouter } from 'vue-router';
import PlatformNavBar from './components/PlatformNavBar.vue'
import SiderBar from './components/SiderBar.vue'
const {push} = useRouter()
</script>
<template>
  <n-layout style="height: 100vh" class="contain">
    <n-layout-header style="box-shadow: 0 2px 4px rgb(0 0 0 / 8%);"
      class="text-2xl flex items-center justify-between px-50px h-52px z-10 fixed top-0">
      <PlatformNavBar />
    </n-layout-header>
    <n-layout position="absolute" style="top: 50px; bottom: 64px; height: 100%;" has-sider>
      <n-layout-sider  class="!w-120" content-style="padding: 24px;" :native-scrollbar="false" bordered>
        <div class="w-full flex justify-center mt-10 mb-5">
          <n-button @click="push('/platform/create')" type="primary" class="w-7/10 !font-bold text-3xl h-18">投 稿</n-button>
        </div>
        <SiderBar />
      </n-layout-sider>
      <n-layout-content :native-scrollbar="false"
        class="bg-$light-bg-color light:bg-$light-bg-color dark:bg-v-dark">
        <div style="background-color: rgba(0, 0, 0, 0);" class="relative mt-5 ml-10 !mr-10 w-98% !border-opacity-0">
          <n-card class="mr-10 absolute min-h-255">
            <RouterView/>
          </n-card>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">

</style>
<style>
.n-scrollbar>.n-scrollbar-container>.n-scrollbar-content {
  padding: 0 !important;
}
.contain .n-card > .n-card__content:first-child, .n-card > .n-card__footer:first-child {
  padding-top: 5px;
}
</style>