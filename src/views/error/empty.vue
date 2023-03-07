<script setup lang='ts'>
const props = defineProps({
  messege: {
    type: String,
    default: '这儿什么都没有'
  }
})
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center ">
      <SvgIcon size="200" name="empty" />
      <span class="text-gray-400 cursor-default select-none">{{messege}}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>