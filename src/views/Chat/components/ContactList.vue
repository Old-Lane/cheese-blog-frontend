<script setup lang='ts'>
const search = ref('')
</script>

<template>
  <div>
    <n-card class="w-340px h-600px">
      <n-input v-model:value="search" clearable placeholder="搜索联系人（Enter搜索）"/>
    </n-card>
  </div>
</template>

<style lang='scss' scoped>

</style>