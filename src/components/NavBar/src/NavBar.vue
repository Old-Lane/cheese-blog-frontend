<script lang="ts" setup>
import { h, ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { navApi } from "@/api/login";
import SvgIcon from "@/components/SvgIcon.vue";
import NavUserCard from "@/components/NavUserCard/src/NavUserCard.vue";
import Cookies from 'js-cookie';

const { push, currentRoute } = useRouter()
const userStore = useUserStore()

const activeKey = ref<string>(currentRoute.value.path)
const search = ref('')
const nav = ref<any>({})
const avatar = ref()

const menuOptions = ref<MenuOption[]>([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Index'
          }
        },
        { default: () => '首页' }
      ),
    key: '/',
  },
  {
    label: '学习',
    key: '/study',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'MyClass'
          }
        },
        { default: () => '校园' }
      ),
    key: '/myClass',
  },
])

onMounted(async () => {
  if (Cookies.get('token')) {
    await navApi().then(res => {
      nav.value = res.data
      
    }, rej => {
      nav.value = rej.data
    })
  }

})

// console.log(currentRoute.value.path);
watch(
  () => currentRoute.value.path,
  val => {
    activeKey.value = val
  }
)

const toIndex = (e: MouseEvent): MouseEvent => {
  push('/')
  return e
}

const toLogin = (e: MouseEvent): MouseEvent => {
  push('/login')
  return e
}

const toPlatform = (e: MouseEvent): MouseEvent => {
  push('/platform')
  return e
}

</script>

<template>
  <!--  <div class="nav-bar">-->
  <div class="flex justify-between">
    <div class="flex justify-between items-center mr-10 cursor-pointer" @click="toIndex">
      <SvgIcon :size="30" name="cheese" class="cursor-pointer mr-2" />
      <span class="select-none text-3xl">芝士博客</span>
    </div>
    <n-menu class="text-2xl" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
  </div>
  <div class="w-150">
    <n-input placeholder="搜索感兴趣的内容" v-model:value="search" class="w-180" :size="'large'">
      <template #suffix>
        <span
          class="cursor-pointer hover:bg-gray-200 transition-all duration-300 w-12 h-12 rounded-1/5 flex items-center justify-center">
          <SvgIcon name="search" />
        </span>
      </template>
    </n-input>
  </div>
  <div class="flex items-center justify-between w-155">
    <div class=" login cursor-pointer w-auto flex items-center justify-between ">
      <span v-if="!nav.isLogin" @click="toLogin">登录</span>
      <NavUserCard v-else :nav="nav" />
    </div>
    <div class="cursor-pointer hover:text-$primary-color-hover">
      消息
    </div>
    <div class="cursor-pointer hover:text-$primary-color-hover">
      历史
    </div>
    <ThemeSwitch />
    <div @click="toPlatform" class="cursor-pointer hover:text-$primary-color-hover">
      创作中心
    </div>
    <n-button type="primary" @click="push('/platform/create')">
      <template #icon>
        <SvgIcon name="write" class="mt-2" />
      </template>
      创作
    </n-button>
  </div>
  <!--  </div>-->
</template>

<style scoped lang="scss">
.n-menu .n-menu-item-content {
  padding-left: 20px !important;
}
</style>