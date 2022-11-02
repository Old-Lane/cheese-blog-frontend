<script setup lang='ts'>
import AppLeft from '@/layout/BaseLayout/components/AppLeft.vue';
import AppRight from '@/layout/BaseLayout/components/AppRight.vue';

</script>

<template>
  <div class="flex h-100vh w-full mt-6 justify-between">
    <div class="w-75/100">
      <AppLeft/>
    </div>
    <div class="w-24/100">
      <AppRight/>
    </div>
    
  </div>
</template>

<style lang='scss' scoped>

</style>