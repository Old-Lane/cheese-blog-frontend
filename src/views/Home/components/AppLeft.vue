<script setup lang="ts">
import { getUserCardInfoApi } from '@/api/user';
import SvgIcon from '@/components/SvgIcon.vue'
import PopoverCard from '@/components/UserInfoCard/PopoverCard.vue';
import ArticleList from '@/components/ArticleList/index.vue'
import { useRouter } from 'vue-router';
import { useEmitt } from '@/hook/web/useEmitt';

const { push, currentRoute } = useRouter()

const focus = ref(currentRoute.value.query.sort === undefined ? 'recommend':currentRoute.value.query.sort)


onMounted(() => {
  useEmitt().emitter.emit('listArticle', focus.value)
})

const getArticleList = () => { }

watch(
  () => currentRoute.value,
  val => {
    // console.log(val.query.sort!);
    focus.value = val.query.sort===undefined ? 'recommend' : val.query.sort
  }
)

const handleUpdateValue = (name: string) => {
  useEmitt().emitter.emit('listArticle', {sort: focus.value})
  if (name === 'recommend') {
    push({
      path: '/',
    })
  } else {
    push({
      path: '/',
      query: {
        sort: name
      }
    })
  }

}

</script>

<template>
  <div class="home-app-right">
    <transition name="zoom-fade" mode="in-out">
      <n-card class="">
        <n-tabs type="line" v-model:value="focus" @update:value="handleUpdateValue">
          <n-tab name="recommend">
            推荐
          </n-tab>
          <n-tab name="newest">
            最新
          </n-tab>
          <n-tab name="hottest">
            热门
          </n-tab>
        </n-tabs>
        <ArticleList />
      </n-card>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

<style lang="scss">
.home-app-right .n-card>.n-card__content:first-child,
.n-card>.n-card__footer:first-child {
  padding-top: 0.1rem;
}

.home-app-right .n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>