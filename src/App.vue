<script setup lang="ts">
import themeOverrides from '@/utils/theme'
import zhCN from 'naive-ui'
import dateZhCN from 'naive-ui'
import {useAppStore} from "@/store/modules/app";
import {useCache} from "@/hook/web/useCache";
import {storeToRefs} from "pinia";

const { wsCache } = useCache()

const appStore = useAppStore()
const {theme} = storeToRefs(appStore)

const isDark = (): boolean => {
  return window.matchMedia('dark').matches
}

// 根据浏览器当前主题设置系统主题色
const setDefaultTheme = () => {
  if (wsCache.get('isDark')) {
    appStore.setIsDark(wsCache.get('isDark'))
    return
  }
  const isDarkTheme = isDark()
  appStore.setIsDark(isDarkTheme)
}

setDefaultTheme()

</script>

<template>
<!--    <n-button @click="changeTheme">主题</n-button>-->
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme" :theme-overrides="themeOverrides">
      <router-view v-slot="{ Component }" class="light:bg-$light-bg-color dark:bg-v-dark">
        <transition name="zoom-fade" mode="in-out">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-config-provider>
</template>

<style lang="scss">

</style>
