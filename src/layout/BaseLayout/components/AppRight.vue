<template>
  <div class="app-right h-100vh border-0 flex flex-col !p-0 rounded-3px light:bg-$light-bg-color dark:bg-v-dark">
    <n-card class="p-5 mb-5">
        <div class="text-2xl flex items-center mb-3">
          <SvgIcon name="社区" :size="22" class="mr-2" />
          <span>{{ greetings }}</span>
        </div>
        <div class="flex justify-center">愿时光不负努力</div>
    </n-card>

    <n-card class="p-5 mb-5">
        <div class="text-2xl flex items-center mb-3">
          <SvgIcon name="rank" :size="22" class="mr-2" />
          <span>作者排行</span>
        </div>
        <div class="flex justify-center h-40">占个位</div>
    </n-card>

    <n-card class="p-5 mb-5">
        <div class="text-2xl flex items-center mb-3">
          <SvgIcon name="recomend" :size="22" class="mr-2" />
          <span>文章推荐</span>
        </div>
        <div class="flex justify-center h-40">占个位</div>
    </n-card>

  </div>
</template>

<script setup lang="ts">
const greetings = ref('')

const newTime = ref(0)

onMounted(() => {
  getNowTime();//进入页面调用该方法获取当前时间
  // clearInterval(myTimeDisplay);//销毁之前定时器
  let myTimeDisplay = setInterval(() => {
    getNowTime(); //每秒更新一次时间
  }, 1000);
})

const getNowTime = () => {
  const date = new Date()
  // var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  newTime.value = date.getHours()
}

watch(
  () => newTime.value,
  newVal => {
    if (newVal > 5 && newVal < 8) {
      greetings.value = '早上好！'
    } else if (newVal >= 8 && newVal < 11) {
      greetings.value = '上午好！'
    } else if (newVal >= 11 && newVal < 13) {
      greetings.value = '中午好！'
    } else if (newVal >= 13 && newVal < 19) {
      greetings.value = '下午好！'
    } else {
      greetings.value = '晚上好！'
    }
  }
)



</script>

<style scoped lang="scss">
/* .n-card.n-card--bordered {
  border: 0;
} */
</style>
<style>
.app-right .n-card>.n-card__content {
  padding: 0 !important;
}
</style>