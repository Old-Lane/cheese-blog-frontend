<template>
  <div class="app-right border-0 flex flex-col !p-0 rounded-3px light:bg-$light-bg-color dark:bg-v-dark">
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
      <div @click="toPerson(item.id)" v-for="item in authors" class="flex items-center mt-10 cursor-pointer">
        <n-avatar :size="45" round :src="item.avatar" />
        <span class="ml-5">{{ item.nickname }}</span>
      </div>
    </n-card>

    <!-- <n-card class="p-5 mb-5">
      <div class="text-2xl flex items-center mb-3">
        <SvgIcon name="recomend" :size="22" class="mr-2" />
        <span>文章推荐</span>
      </div>
      <div class="flex justify-center h-40">占个位</div>
    </n-card> -->

  </div>
</template>

<script setup lang="ts">
import { getAuthorTop10 } from '@/api/user';
import { useRouter } from 'vue-router';

const {push} = useRouter()

const greetings = ref('早上好')

const newTime = ref<number>()
const authors = ref<Array<any>>([])

onMounted(() => {
  getNowTime();//进入页面调用该方法获取当前时间
  setInterval(() => {
    getNowTime(); //每秒更新一次时间
  }, 1000);
  getAuthor()
})

const getNowTime = () => {
  const date = new Date()
  // var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  newTime.value = date.getHours()
}

watch(
  () => newTime.value,
  newVal => {
    if (newVal! > 5 && newVal! < 8) {
      greetings.value = '早上好！'
    } else if (newVal! >= 8 && newVal! < 11) {
      greetings.value = '上午好！'
    } else if (newVal! >= 11 && newVal! < 13) {
      greetings.value = '中午好！'
    } else if (newVal! >= 13 && newVal! < 19) {
      greetings.value = '下午好！'
    } else {
      greetings.value = '晚上好！'
    }
  }
)

const getAuthor = () => {
  getAuthorTop10().then(res => {
    authors.value = res.data
  })
}

const toPerson = (id: string) => {
  push({
    name: 'PersonalIndex',
    params: {uid: id}
  })
}


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