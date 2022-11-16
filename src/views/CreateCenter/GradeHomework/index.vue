<script setup lang='ts'>import { Role } from '@/constant/role';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
const { push } = useRouter()
const role1 = Cookies.get('role')

/* const props = defineProps({
  role: {
    type: String,
    default: Role.COMMON
  }
})

const {role} = toRefs(props)

watch(
  () => role.value,
  val => {
    // role.value = val
    if (val !== Role.TEACHER) {
      push('/platform/403')
      // console.log(1);
    }
  }
) */


onMounted(() => {
  // console.log(role1,2);
  if (role1 !== Role.TEACHER) {
    push('/platform/403')
  }
})

</script>

<template>
  <div>
    批改作业
  </div>
</template>

<style lang='scss' scoped>

</style>