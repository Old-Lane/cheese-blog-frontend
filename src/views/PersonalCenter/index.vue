<script setup lang='ts'>
import { getUserCardInfoApi } from '@/api/user';
import AppMain from '@/components/AppMain/index.vue'
import { useEmitt } from '@/hook/web/useEmitt';
import { useRouter } from 'vue-router';
import AppLeft from "./components/AppLeft.vue";
import AppRight from "./components/AppRight.vue";

const { currentRoute } = useRouter()

onMounted(() => {
  getUserCardInfoApi(currentRoute.value.params.uid).then(res => {
    useEmitt().emitter.emit('getUserInfo', res.data)
  })
})

</script>

<template>
  <div>
    <AppMain>
      <template v-slot:left>
        <AppLeft />
      </template>
      <template v-slot:right>
        <AppRight />
      </template>
    </AppMain>
  </div>
</template>

<style lang='scss' scoped>

</style>