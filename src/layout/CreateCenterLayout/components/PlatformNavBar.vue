<script setup lang='ts'>
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { useRouter } from "vue-router";
const { push } = useRouter()

const toIndex = (event : MouseEvent) : MouseEvent => {
  push('/')
  return event
}
</script>

<template>
  <div class="flex justify-between items-center w-100">
    <div class="flex justify-between items-center mr-10 cursor-pointer" @click="push('/platform/home')">
      <SvgIcon :size="30" name="cheese" class="cursor-pointer mr-2" />
      <span class="select-none text-3xl font-bold">创作中心</span>
    </div>
    <div class="cursor-pointer" @click="toIndex">主站</div>
  </div>
  <div class="flex items-center w-80 justify-between">
    <div class=" login cursor-pointer w-auto flex items-center justify-between ">
      <n-avatar round size="large" src="src/assets/imgs/lucy.jpg" class="" />
    </div>
    <div class="w-1px h-16px bg-gray-400"></div>
    <div style="color: #d9d9d2;" class="cursor-pointer hover:text-$primary-color-hover">
      <SvgIcon name="message" :size="24" />
    </div>
    <ThemeSwitch />
  </div>
</template>

<style lang='scss' scoped>

</style>