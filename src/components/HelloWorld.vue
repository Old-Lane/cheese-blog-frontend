<template>
  <div class="wrapper">
    <div class="box">
      测试文字
    </div>
    <div>
      <n-button @click="changeTheme">切换主题</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
//定义主题状态
let themeType = ref<string>('default');
/**
 * 改变主题
 */
const changeTheme = ():void =>{
  themeType.value = themeType.value == 'default'?'dark':'default'
  document.getElementsByTagName('body')[0].setAttribute('data-theme',themeType.value)
}
</script>
<style scoped lang="scss">
.box{
  @include home();
  @include themeify{
    color: themed('font-color');
  }
}
</style>

