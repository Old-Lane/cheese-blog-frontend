<script setup lang='ts'>import { testApi } from '@/api/teacher';

const test = () => {
  testApi().then(res => {
    console.log(res.message);
  })
}
</script>

<template>
  <div>
    评论管理
    <n-button @click="test">test</n-button>
  </div>
</template>

<style lang='scss' scoped>

</style>