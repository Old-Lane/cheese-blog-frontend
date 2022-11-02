<template>
  <div class="avatar-header" @mouseleave="() => { avatarVisi = true; floatCardVisi = false}">
    <n-avatar round :size="35" :class="floatCardVisi ? 'avatarLargeAnimation' : 'avatarSmallAnimation'" class="avatar"
              shape="circle" :src="nav.avatar" @mouseenter="() => { floatCardVisi = true }" @click="toPersonalCenter"/>
    <div class="floatCard " :class="floatCardVisi ? 'floatCardAnimation' : ''">
      <!-- <n-avatar class="floatCard-avatar" shape="circle" :src="nav.avatar" /> -->
      <div class="floatCard-cont light:bg-white dark:bg-$n-color">
        <div style="width: 100%; padding-top: 25px;">
          <h1 class="flex items-center justify-center mt-8 text-3xl">{{ nav.nickname }}</h1>
          <div class="table table-fixed my-0 mx-auto text-center mt-5">
            <div class="table-cell px-8">
              <div class="text-3xl">1</div>
              <div class="text-12px">关注</div>
            </div>
            <div class="table-cell px-8">
              <div class="text-3xl">2</div>
              <div class="text-12px">粉丝</div>
            </div>
            <div class="table-cell px-8">
              <div class="text-3xl">3</div>
              <div class="text-12px">获赞</div>
            </div>
          </div>
          <div class="mt-5 flex flex-col text-14px">
            <div @click="toPersonalCenter" class="hover:bg-gray-200 h-14 rounded-lg flex items-center transition-all justify-between px-6">
              <div class="flex">
                <div class="w-30px">
                  <SvgIcon name="user"/>
                </div>
                <span>个人中心</span>
              </div>
              <div>
                <SvgIcon name="right"/>
              </div>
            </div>
            <div class="hover:bg-gray-200 h-14 rounded-lg flex items-center transition-all justify-between px-6">
              <div class="flex">
                <div class="w-30px">
                  <SvgIcon name="contribute"/>
                </div>
                <span>投稿管理</span>
              </div>
              <div>
                <SvgIcon name="right"/>
              </div>
            </div>
          </div>
          <n-divider/>
          <div @click="handleLogout"
               class="hover:bg-gray-200 text-14px h-14 rounded-lg flex items-center transition-all justify-between px-6">
            <div class="flex">
              <div class="w-30px">
                <SvgIcon name="logout"/>
              </div>
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import Cookies from "js-cookie";
import {useRouter} from "vue-router";
import {logout} from "@/api/login";
import {useUserStore} from "@/store/modules/user";

const {push} = useRouter()
const {setIsLogin} = useUserStore()

const props = defineProps({
  nav: {
    type: Object,
    default: null
  }
})

const floatCardVisi = ref(false)
const avatarVisi = ref(true)

const toPersonalCenter = () => {
  Cookies.set('uid', props.nav.uid)
  push({
    name: 'PersonalIndex',
    params: {uid: props.nav.uid}
  })
}

//退出登录
const handleLogout = () => {
  logout().then(res => {
    Cookies.remove('token')
    push('/login')
    setIsLogin(false)
  })
}

</script>

<style scoped lang="scss">
@keyframes avatar-large {
  0% {
    transform: scale(1)
  }

  to {
    transform: scale(2) translate(-6px, 12px)
  }
}

@keyframes avatar-small {
  0% {
    transform: scale(2) translate(-6px, 12px)
  }

  to {
    transform: scale(1)
  }
}

@keyframes floatCardAnimation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes floatCardAnimation2 {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.animate-avatar-hover {
  animation: avatar-small .5s both;

  &:hover {
    animation: avatar-large .5s both;
  }
}

.avatar-header {
  height: 100%;
  position: relative;
  display: flex;

  .avatar {
    cursor: pointer;
    z-index: 1000;
  }
}

.avatarLargeAnimation {
  animation: avatar-large .3s forwards;
  -webkit-animation: avatar-large .3s forwards;
  /* Safari 和 Chrome */
}

.avatarSmallAnimation {
  animation: avatar-small .3s forwards;
  -webkit-animation: avatar-small .3s forwards;
  /* Safari 和 Chrome */
}

.floatCardAnimation {
  display: block !important;
  animation: floatCardAnimation .3s forwards;
  -webkit-animation: floatCardAnimation .3s forwards;
  /* Safari 和 Chrome */
}

.floatCardAnimation2 {
  display: block !important;
  animation: floatCardAnimation2 .3s forwards;
  -webkit-animation: floatCardAnimation2 .3s forwards;
  /* Safari 和 Chrome */
}

.floatCard {
  display: none;
  width: 250px;
  position: absolute;
  top: 50px;
  left: -118px;
  z-index: 0;

  .floatCard-cont {
    //background-color: #fff;
    padding: 0 15px 10px 15px;
    box-shadow: 0 0 30px rgb(0 0 0 / 10%);
    border-radius: 8px;
  }
}

.n-divider:not(.n-divider--vertical) {
  margin-top: 13px;
  margin-bottom: 12px;
}
</style>