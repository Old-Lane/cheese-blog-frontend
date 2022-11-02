<template>
  <div>
    <transition name="zoom-fade" mode="in-out">
      <n-card class="h-100vh">
        <router-view/>
      </n-card>
    </transition>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>