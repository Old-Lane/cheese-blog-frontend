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
    <n-input placeholder="搜索感兴趣的内容" v-model:value="search" class="w-200" :size="'large'">
      <template #suffix>
        <span
          class="cursor-pointer hover:bg-gray-200 transition-all duration-300 w-12 h-12 rounded-1/5 flex items-center justify-center">
          <SvgIcon name="search" />
        </span>
      </template>
    </n-input>
  </div>
  <div class="flex items-center justify-between w-300px">
    <div class=" login cursor-pointer w-auto flex items-center justify-between">
      <span v-if="!nav.isLogin" @click="toLogin">登录</span>
      <NavUserCard v-else :nav="nav"/>
    </div>
    <div class="cursor-pointer hover:text-$primary-color-hover">
      消息
    </div>
    <div class="cursor-pointer hover:text-$primary-color-hover">
      历史
    </div>
    <ThemeSwitch />

    <n-button type="primary">
      <template #icon>
        <SvgIcon name="write" class="mt-2" />
      </template>
      创作
    </n-button>
  </div>
  <!--  </div>-->
</template>

<script lang="ts" setup>
import { defineComponent, h, ref, Component } from 'vue'
import { NIcon, NText, NAvatar } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { navApi } from "@/api/login";
import SvgIcon from "@/components/SvgIcon.vue";
import { tr } from 'date-fns/locale';
import NavUserCard from "@/components/NavUserCard/src/NavUserCard.vue";
import Cookies from "js-cookie";

const { push } = useRouter()
const userStore = useUserStore()
const { user, isLogin } = storeToRefs(userStore)

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = ref<MenuOption[]>([
  {
    label: '首页',
    key: 'pinball-1973',
  }, {
    label: '学习',
    key: 'pinball-1973',
  }, {
    label: '班级',
    key: 'pinball-1973',
  },
])

const toIndex = (): void => {
  push('/')
}
const activeKey = ref<string | null>(null)
const toLogin = () => {
  push('/login')
}
const toUserCenter = () => {

}

const nav = ref({})
const avatar = ref()
onMounted(async () => {
  await navApi().then(res => {
    nav.value = res.data
  }, rej => {
    nav.value = rej.data
  })
})

const search = ref('')


</script>
<style scoped lang="scss">
.n-menu .n-menu-item-content {
  padding-left: 20px !important;
}
</style>