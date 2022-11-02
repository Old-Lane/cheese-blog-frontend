<template>
    <n-layout class="flex flex-col top-0">
      <n-layout-header style="box-shadow: 0 2px 4px rgb(0 0 0 / 8%);" class="text-2xl flex items-center justify-between pr-100px pl-100px h-52px z-10 fixed top-0" >
        <NavBar/>
      </n-layout-header>
<!--      <n-layout  class="light:bg-$light-bg-color dark:bg-v-dark top-52px">-->
<!--        <n-layout-content class="light:bg-$light-bg-color dark:bg-v-dark top-52px">-->
      <div class="light:bg-$light-bg-color dark:bg-v-dark top-52px mt-52px">
        <AppMain />
      </div>
<!--        </n-layout-content>-->
<!--      </n-layout>-->
    </n-layout>
</template>

<script setup lang="ts">
import AppMain from "@/layout/BaseLayout/components/AppMain.vue";
import NavBar from "@/components/NavBar/src/NavBar.vue";
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
}
</style>