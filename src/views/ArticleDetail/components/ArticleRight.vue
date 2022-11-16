<script setup lang='ts'>
import UserInfoCard from '@/components/UserInfoCard/index.vue'
</script>

<template>
  <div class="w-300px flex flex-col">
    <UserInfoCard class="mb-8"/>
    <n-card class="mb-8">
      <div class="text-2xl flex items-center mb-3">
        <SvgIcon name="recomend" :size="22" class="mr-2" />
        <span>相关文章</span>
      </div>
      <div class="flex justify-center h-40">占个位</div>
    </n-card>
    <n-card>
      <div class="text-2xl flex items-center mb-3">
        <SvgIcon name="recomend" :size="22" class="mr-2" />
        <span>目录</span>
      </div>
      <div class="flex justify-center h-40">占个位</div>
    </n-card>
  </div>
</template>

<style lang='scss' scoped>

</style>