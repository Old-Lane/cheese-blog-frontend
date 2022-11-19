<script setup lang='ts'>
import ArticleList from '@/components/ArticleList/index.vue'
import { useEmitt } from '@/hook/web/useEmitt';
import { useRouter } from 'vue-router';

const sort = ref('newest')

const { push, currentRoute } = useRouter()
onMounted(() => {
  useEmitt().emitter.emit('listArticle', {
    sort: sort.value,
    page: 1,
    pageSize: 10,
    uid: currentRoute.value.params.uid
  })
})
</script>

<template>
  <div>
    <ArticleList />
  </div>
</template>

<style lang='scss' scoped>

</style>