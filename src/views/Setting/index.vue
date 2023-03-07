<script setup lang='ts'>
import { ChevronBack, NewspaperOutline, SettingsOutline } from '@vicons/ionicons5'
import Cookies from 'js-cookie';
import { MenuInst, NIcon } from 'naive-ui';
import { Component } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'

const { push, currentRoute } = useRouter()

const activeKey = ref<string>(currentRoute.value.path)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = ref([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Profile'
          }
        },
        { default: () => '个人资料' }
      ),
    key: '/setting/profile',
    icon: renderIcon(NewspaperOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Account'
          }
        },
        { default: () => '账号设置' }
      ),
    key: '/setting/account',
    icon: renderIcon(SettingsOutline)
  },
])

watch(
  () => currentRoute.value.path,
  val => {
    activeKey.value = val
  }
)

const toPersonalCenter = () => {
  const uid = Cookies.get('uid')
  push({
    name: 'PersonalIndex',
    params: { uid: uid }
  })
}

const handleUpdateValue = () => {

}
</script>

<template>
  <div class="w-1200px mx-auto my-0 setting">
    <div class="topbar">
      <n-card class="mb-5 ">
        <div class="w-50 flex items-center">
          <n-button text class="text-gray-400" @click="toPersonalCenter">
            <template #icon>
              <n-icon size="18" class="!m-0">
                <ChevronBack />
              </n-icon>
            </template>
            返回个人主页
          </n-button>
        </div>
      </n-card>
    </div>

    <div class="flex h-90vh">
      <div class="sidebar">
        <n-card class="mr-10 w-230px h-full">
          <n-menu v-model:value="activeKey" ref="menuInstRef" :options="menuOptions" @update:value="handleUpdateValue" />
        </n-card>
      </div>

      <n-card class="w-full">
        <RouterView />
      </n-card>
    </div>

  </div>
</template>

<style lang='scss'>
.setting {
  .topbar .n-card>.n-card__content {
    padding: 6px 25px;
    width: 230px;
  }

  .sidebar .n-card>.n-card__content {
    padding: 8px;
  }
}
</style>