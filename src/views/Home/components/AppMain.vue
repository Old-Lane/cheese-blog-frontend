<template>
  <div class="app-main-layout">
    <div class="app-left">
      <AppLeft/>
    </div>
    <div class="app-right">
      <AppRight/>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLeft from "./AppLeft.vue";
import AppRight from "./AppRight.vue";
</script>

<style scoped lang="scss">
.app-main-layout {
  width: 960px;
  // height: 100%;
  //background-color: #f39ec9;
  // margin: 0 auto;
  // padding-top: 2rem;
  display: flex;
  justify-content: space-between;
}
@media screen and (min-width: 960px){
  .app-left {
    width: 700px;
    height: 100%;
    // background-color: #ffffff;
  }
  .app-right {
    width: 240px;
    height: 100%;
    // background-color: #fff;
  }
}
@media screen and (max-width: 960px){
  .app-left {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .app-right {
    width: 0;
  }
}

</style>