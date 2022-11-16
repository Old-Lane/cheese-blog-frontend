<script setup lang='ts'>
const props = defineProps({
  cardInfo: {
    type: Object,
    default: {
      id: '',
      avatar: '',
      nickname: '',
      fans: '',
      friends: '',
    }
  }
})

</script>

<template>
  <div>
    <div class="flex items-center mb-5 cursor-pointer">
      <span class="mr-4">
        <n-avatar round size="large" :src="cardInfo.avatar" />
      </span>
      <span class="font-600 text-2xl">
        {{ cardInfo.nickname }}
      </span>
    </div>
    <div class="flex items-center justify-center">
      <n-button type="primary" class="mr-8 w-35">关注</n-button>
      <n-button ghost type="primary" class=" w-35">私信</n-button>
    </div>
    <n-divider class="!my-5" />
    <div class="flex items-center justify-center">
      <div class="flex flex-col text-2xl items-center cursor-pointer mr-30">
        <span class="mb-2">{{cardInfo.friends}}</span>
        <span class="text-gray-500">关注</span>
      </div>
      <div class="flex flex-col text-2xl items-center cursor-pointer">
        <span class="mb-2">{{cardInfo.fans}}</span>
        <span class="text-gray-500">粉丝</span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>