<script setup lang='ts'>
import ArticleLeft from './components/ArticleLeft.vue';
import ArticleRight from './components/ArticleRight.vue';
import FloatingPane from './components/FloatingPane.vue';

</script>

<template>
  
  
  <div class="my-0 mx-auto max-w-1140px flex justify-between">
    <div class="fixed top-50 left-47">
      <FloatingPane/>
    </div>
    <ArticleLeft/>
    <ArticleRight/>
  </div>
  
</template>

<style lang='scss' scoped>

</style>