<script setup lang="ts">
import { getUserInfoApi } from '@/api/user';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import PlatformNavBar from './components/PlatformNavBar.vue'
import SiderBar from './components/SiderBar.vue'
const { push } = useRouter()
const user = ref<UserType>({
  id: '',
  avatar: '',
  nickname: '',
  username: '',
  email: '',
  role: ''
})

onMounted(() => {
  getUserInfo()
})

const getUserInfo = () => {
  getUserInfoApi().then(res => {
    user.value = res.data
    Cookies.set('role', res.data.role)
  })
}


</script>
<template>
  <n-layout style="height: 100vh" class="contain">
    <n-layout-header style="box-shadow: 0 2px 4px rgb(0 0 0 / 8%);"
      class="flex h-52px px-50px top-0 text-2xl z-10 items-center justify-between fixed">
      <PlatformNavBar />
    </n-layout-header>
    <n-layout position="absolute" style="top: 50px; bottom: 64px; height: 100%;" has-sider>
      <n-layout-sider  class="!w-120" content-style="padding: 24px;" :native-scrollbar="false" bordered>
        <div class="flex mt-10 mb-5 w-full justify-center">
          <n-button @click="push('/platform/create')" type="primary" class="h-18 text-3xl w-7/10 !font-bold">投 稿</n-button>
        </div>
        <SiderBar :role="user.role"/>
      </n-layout-sider>
      <n-layout-content :native-scrollbar="true"
        class="bg-$light-bg-color dark:bg-v-dark  light:bg-$light-bg-color">
        <div style="background-color: rgba(0, 0, 0, 0);" class="mt-5 ml-10 w-98% relative !border-opacity-0 !mr-10 ">
          <n-card class="mr-10 mb-10 min-h-250 absolute">
            <RouterView/>
          </n-card>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">

</style>
<style>
.n-scrollbar>.n-scrollbar-container>.n-scrollbar-content {
  padding: 0 !important;
}
.contain .n-card > .n-card__content:first-child, .n-card > .n-card__footer:first-child {
  padding-top: 20px;
}
</style>