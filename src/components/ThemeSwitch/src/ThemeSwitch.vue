<template>
  <div>
    <n-switch v-model:value="isDark" :rail-style="railStyle" size="large" @update:value="handleSwitch">
      <template #checked-icon>
        <SvgIcon name="moon" :normal="'#7c7d7e'"/>
      </template>
      <template #unchecked-icon>
        <SvgIcon name="sun" />
      </template>
    </n-switch>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { useAppStore } from "@/store/modules/app";
import { CSSProperties } from "vue";
const appStore = useAppStore()
const isDark = ref<boolean>(appStore.getIsDark)

const handleSwitch = () => {
  appStore.setIsDark(isDark.value !== false)
}

const railStyle = ({
  focused,
  checked
}: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#101014'
    style.boxShadow = '0 0 0 2px #f2f2f2'
  } else {
    style.background = '#f4f5f5'
    style.boxShadow = '0 0 0 2px #d9d9d2'
  }
  return style
}
</script>