<script setup lang='ts'>
import AppLeft from './AppSubLeft.vue';
import AppRight from './AppSubRight.vue';

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