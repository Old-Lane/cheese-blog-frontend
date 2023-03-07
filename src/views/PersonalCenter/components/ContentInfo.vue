<script setup lang='ts'>
import { useEmitt } from '@/hook/web/useEmitt';
import { useRouter } from 'vue-router';

const { push, currentRoute } = useRouter()

const focus = ref(currentRoute.value.path.split('/')[3])

const sort = ref('newest')

onMounted(() => {
})

watch(
  () => currentRoute.value,
  val => {
    focus.value = val.path.split('/')[3] === undefined ? '' : val.path.split('/')[3]
  }
)

const handleUpdateValue = (name: string) => {
  name === '' ? push(`/space/${currentRoute.value.params.uid}`) : push(`/space/${currentRoute.value.params.uid}/${name}`)
}

</script>

<template>
  <div class="space-info">
    <n-card class="mt-5">
      <n-tabs type="line" v-model:value="focus" @update:value="handleUpdateValue" class="pt-3">
        <n-tab name="">
          <span class="text-16px">文章</span>
        </n-tab>
        <n-tab name="dynamic">
          <span class="text-16px">动态</span>
        </n-tab>
        <n-tab name="column">
          <span class="text-16px">专栏</span>
        </n-tab>
        <n-tab name="collect">
          <span class="text-16px">收藏夹</span>
        </n-tab>
        <n-tab name="friends">
          <span class="text-16px">关注</span>
        </n-tab>
        <n-tab name="fans">
          <span class="text-16px">粉丝</span>
        </n-tab>
      </n-tabs>
    </n-card>
    <router-view />
  </div>

</template>

<style lang='scss'>
.space-info .n-card>.n-card__content {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.space-info .n-tabs .n-tabs-nav.n-tabs-nav--line-type .n-tabs-nav-scroll-content {
  transition: border-color .3s var(--n-bezier);
    border-bottom: 1px solid rgb(239 239 245 / 0%);
}
.n-card.n-card--bordered {
  border-bottom: 0;
}
</style>