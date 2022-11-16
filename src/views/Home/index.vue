<script setup lang='ts'>
import AppMain from '@/components/AppMain/index.vue'
import AppLeft from "./components/AppLeft.vue";
import AppRight from "./components/AppRight.vue";
</script>

<template>
  <div>
    <AppMain>
      <template v-slot:left>
        <AppLeft/>
      </template>
      <template v-slot:right>
        <AppRight/>
      </template>
    </AppMain>
  </div>
</template>

<style lang='scss' scoped>
</style>