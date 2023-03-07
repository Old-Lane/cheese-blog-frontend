<script setup lang='ts'>
import { useRouter } from 'vue-router';
import ArticleList from '@/components/ArticleList/index.vue';
import { useEmitt } from '@/hook/web/useEmitt';

const { currentRoute } = useRouter()
const tag = ref(currentRoute.value.params.tag)

onMounted(() => {
  useEmitt().emitter.emit('listArticle', {
    sort: 'newest',
    page: 1,
    pageSize: 10,
    // uid: 1
  })
})

watch(
  () => currentRoute.value.params.tag,
  val => {
    tag.value = val
  }
)

</script>

<template>
  <div style="margin-top: -20px;">
    <div class="h-60 pt-15 text-center text-hex-666666 bg-hex-f8f9fa">
      <h1 class="mb-3 text-5xl mt-10 font-700">{{ tag }}</h1>
      <span>123 文章 </span>
    </div>
    <div class="w-960px mx-auto my-0">
      <div class="flex justify-between items-center h-20 text-2xl p-1">
        <span>后端</span>
        <div>
          <span class="cursor-pointer">最新</span>
          <span class="ml-6 cursor-pointer">最热</span>
        </div>
      </div>
      <n-card>
        <ArticleList/>
      </n-card>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>