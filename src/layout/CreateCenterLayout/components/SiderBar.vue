<script setup lang='ts'>
import {MenuOption} from 'naive-ui/es/menu/src/interface';
import SvgIcon from '@/components/SvgIcon.vue'
import { useRouter } from 'vue-router';

const { push, currentRoute } = useRouter()
const selectedKey = ref(currentRoute.value.path)

const menuOptions = ref<MenuOption[]>([
  {
    label: () =>
        h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center'
              }
            },
            [
              h(
                  SvgIcon,
                  {
                    name: 'index',
                    size: '20'
                  },
                  {
                    style: {
                      marginLeft: '20px'
                    }
                  }
              ),
              h(
                  'span',
                  {
                    style: {
                      marginLeft: '20px',
                      fontSize: '16px'
                    }
                  },
                  '首页'
              ),
            ]
        )
    ,
    key: '/platform/home'
  },
  {
    label: () =>
        h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center'
              }
            },
            [
              h(
                  SvgIcon,
                  {
                    name: 'manage',
                    size: '20'
                  },
                  {
                    style: {
                      marginLeft: '20px'
                    }
                  }
              ),
              h(
                  'span',
                  {
                    style: {
                      marginLeft: '20px',
                      fontSize: '16px'
                    }
                  },
                  '管理'
              ),
            ]
        )
    ,
    key: '/platformmanager/article',
    children: [
      {
        label: () =>
            h(
                'div',
                {
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                },
                [
                  h(
                      SvgIcon
                  ),
                  h(
                      'span',
                      {
                        style: {
                          marginLeft: '24px'
                        }
                      },
                      '内容管理'
                  ),
                ]
            )
        ,
        key: '/platform/manager/article'
      },
      {
        label: () =>
            h(
                'div',
                [
                  h(
                      SvgIcon
                  ),
                  h(
                      'span',
                      {
                        style: {
                          marginLeft: '24px',
                        }
                      },
                      '评论管理'
                  ),
                ]
            )
        ,
        key: '/platform/manager/comment'
      }
    ]
  }
])

const handleUpdateValue = (key: string, item: MenuOption) => {
  push(key)
}

</script>

<template>
  <n-menu v-model:value="selectedKey" :options="menuOptions" @update:value="handleUpdateValue"/>
</template>

<style lang='scss'>
.n-menu .n-menu-item-content {
  padding-right: 40px;
  // padding-left: 40px !important;
}
</style>