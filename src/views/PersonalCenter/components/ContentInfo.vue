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
      <n-tabs type="line" v-model:value="focus" @update:value="handleUpdateValue" class="pt-3 pb-2">
        <n-tab name="">
          <span class="text-16px">文章</span>
        </n-tab>
        <n-tab name="dynamic">
          <span class="text-16px">动态</span>
        </n-tab>
        <n-tab name="column">
          <span class="text-16px">专栏</span>
        </n-tab>
        <n-tab name="friends">
          <span class="text-16px">关注</span>
        </n-tab>
        <n-tab name="fans">
          <span class="text-16px">粉丝</span>
        </n-tab>
      </n-tabs>
      <router-view />
    </n-card>
  </div>

</template>

<style lang='scss'>
.space-info .n-card>.n-card__content {
  padding-top: 0 !important;
}
</style>