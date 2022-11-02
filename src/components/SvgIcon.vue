// SvgIcon.vue
<template>
  <svg
      aria-hidden="true"
      :class="[$attrs.class, 'svg-icon']"
      :style="getStyle"
      @mouseenter="color = hoverColor"
      @mouseleave="color = normal"
  >
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  normal: {
    type: String,
    default: ''
  },
  hover: {
    type: String,
    default: ''
  }
})
const color = ref('')
const hoverColor = ref('')
onMounted(() => {
  color.value = props.normal
  if (props.hover === '') {
    hoverColor.value = props.normal
    // console.log(hoverColor.value)
  } else {
    hoverColor.value = props.hover
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s
  }
})
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
