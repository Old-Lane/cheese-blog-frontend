<script setup lang='ts'>

</script>

<template>
  <div class="app-main-layout">
    <div class="app-left">
      <slot name="left" ></slot>
    </div>
    <div  class="app-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-main-layout {
  width: 960px;
  // height: 100%;
  //background-color: #f39ec9;
  margin: 0 auto;
  // padding-top: 2rem;
  display: flex;
  justify-content: space-between;
}
@media screen and (min-width: 960px){
  .app-left {
    width: 710px;
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