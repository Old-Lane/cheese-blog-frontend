<template>
  <!-- <n-layout class="flex flex-col top-0"> -->
  <div class="h-100vh flex flex-col" style="">
    <transition name="navBar">
      <n-layout-header v-show="display" ref="navBar" style="box-shadow: 0 2px 4px rgb(0 0 0 / 8%);"
        class="flex h-52px pr-100px pl-100px top-0 text-2xl z-10 items-center justify-between fixed duration-150">
        <NavBar />
      </n-layout-header>
    </transition>

    <div class="dark:bg-v-dark light:bg-$light-bg-color">
      <div class=" my-0 mx-auto top-52px dark:bg-v-dark light:bg-$light-bg-color pt-52px">
        <router-view class="pt-8" />
      </div>
    </div>
    <n-back-top :right="30" :bottom="80"/>
  </div>


  <!-- </n-layout> -->
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar/src/NavBar.vue";

const display = ref(true)
const scroll = ref(0)
onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

    if (scrollTop > 300) {
      display.value = false
    } else {  
      display.value = true
    }

    if (scrollTop - scroll.value < 0) {
      display.value = true
    }
    scroll.value = scrollTop
  })
})
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
}

/* 1.过渡动画 */
@keyframes axisY {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0px);
  }
}

/* 2. 过渡类名 */
/* 开始 */
.navBar-enter-active {
  animation: axisY 0.4s;
}
/* 结束 */
.navBar-leave-active {
  animation: axisY 0.4s reverse;
}

</style>