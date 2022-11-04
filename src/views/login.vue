<template>

  <div class="contain light:bg-$light-bg-color dark:bg-v-dark">
    <transition name="login-fade" mode="in-out">
      <n-card v-if="!isPasswordLogin">
        <div style="padding: 0 30px;">
          <h2 style="text-align: center; padding: 15px 0 10px;">登 录</h2>
          <n-form ref="formRef"
                  :model="user"
                  :rules="rules"
                  label-placement="left"
                  label-width="auto"
                  :show-label="false"
                  class="login-form"
          >
            <n-form-item path="email" label="邮箱" class="flex-between">
              <n-input size="large" v-model:value="user.email" @keydown.enter.prevent placeholder="邮箱" class="email-input">
                <template #prefix>
                  <SvgIcon name="username" :normal="'grey'" style="margin-right: 5px;"/>
                </template>
              </n-input>
              <n-button ghost color="#9ad6ee" :disabled="disabled" class="send-code" @click="sendCode">{{codeMessage}}</n-button>
            </n-form-item>
            <n-form-item path="code" label="验证码">
              <n-input size="large" v-model:value="user.code" @keydown.enter.prevent placeholder="验证码">
                <template #prefix>
                  <SvgIcon name="code" :normal="'grey'" style="margin-right: 5px;"/>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <div class="login-item">
            <n-checkbox
                :checked="isAgree === true"
                size="small"
                @click="isAgree = !isAgree"
            >
            <span ref="agree">
              同意用户协议
            </span>
            </n-checkbox>
            <span v-if="!isPasswordLogin" @click="isPasswordLogin = true">密码登录</span>
            <span v-else @click="isPasswordLogin = false">邮箱登录</span>
          </div>
          <div class="login-submit">
            <n-button color="#87CEEBFF" @click="handleLogin">登 录</n-button>
          </div>
        </div>
        <img src="@/assets/icons/wave.svg" style="float: bottom; display: block; overflow: hidden; border-radius: 5px" alt="">
      </n-card>
    </transition>
    <transition name="login-fade" mode="in-out">
      <n-card v-if="isPasswordLogin">
        <div style="padding: 0 30px;">
          <h2 style="text-align: center; padding: 15px 0 10px;">登 录</h2>
          <n-form ref="formRef"
                  :model="user"
                  :rules="rules"
                  label-placement="left"
                  label-width="auto"
                  :show-label="false"
                  class="login-form"
          >
            <n-form-item path="username" label="用户名" class="flex-between">
              <n-input size="large" v-model:value="user.username" @keydown.enter.prevent placeholder="用户名">
                <template #prefix>
                  <SvgIcon name="username" :normal="'grey'" style="margin-right: 5px;"/>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password" label="密码">
              <n-input type="password" show-password-on="mousedown" size="large" v-model:value="user.password" @keydown.enter.prevent placeholder="密码">
                <template #prefix>
                  <SvgIcon name="password" :normal="'grey'" style="margin-right: 5px;"/>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <div class="login-item">
            <n-checkbox
                :checked="isAgree === true"
                size="small"
                @click="isAgree = !isAgree"
            >
            <span ref="agree">
              同意用户协议
            </span>
            </n-checkbox>
            <span v-if="!isPasswordLogin" @click="isPasswordLogin = true">密码登录</span>
            <span v-else @click="isPasswordLogin = false">邮箱登录</span>
          </div>
          <div class="login-submit">
            <n-button color="#87CEEBFF" @click="handleLogin">登 录</n-button>
          </div>
        </div>
        <img src="@/assets/icons/wave.svg" style="float: bottom; display: block; overflow: hidden; border-radius: 5px" alt="">
      </n-card>
    </transition>

  </div>
</template>

<script setup lang="ts">
import {FormInst, FormItemRule, FormRules} from "naive-ui";
import SvgIcon from "@/components/SvgIcon.vue";
import {code, getUserInfoApi, login} from "@/api/login";
import Cookies from 'js-cookie'
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/store/modules/user";
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

const route = useRoute()
const {setIsLogin} = useUserStore()
const { currentRoute, addRoute, push, replace} = useRouter()

type User = {
  username: string,
  password: string,
  email: string,
  code: string
}

const user = reactive<User>({
  username: '',
  password: '',
  email: '',
  code: ''
})

const isPasswordLogin = ref<boolean>(false)

const codeMessage = ref<string>('发送验证码')
const disabled = ref<boolean>(false)
//发送验证码
const sendCode = () => {
  code(user.email).then(res => {})
  disabled.value = true
  let i = 60
  codeMessage.value = (i--) + '秒后可重发'
  let timer = setInterval(() => {
    codeMessage.value = (i--) + '秒后可重发'
  }, 1000)
  setTimeout(() => {
    clearInterval(timer)
    disabled.value = false
    codeMessage.value = '发送验证码'
  }, 59000)
}

const isAgree = ref<boolean>(false)
const agree = ref()
const formRef = ref<FormInst | null>()
const rules: FormRules = {
  email: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      return new Promise<void>((resolve, reject) => {
        const regx = /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (value === '') {
          reject(Error('请输入邮箱'))
        }else if (!regx.test(value)) {
          reject(Error('邮箱格式有误')); // reject with error message
        } else {
          resolve();
        }
      })
    }
  },
  code: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      return new Promise<void>((resolve, reject) => {
        if (value === '') {
          reject(Error('请输入验证码'))
        } else if(value.length !== 6) {
          reject(Error('验证码格式有误'))
        } else {
          resolve()
        }
      })
    }
  },
  username: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      return new Promise<void>((resolve, reject) => {
        if (value === '') {
          reject(Error('请输入用户名'))
        }else {
          resolve()
        }
      })
    }
  },
  password: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      return new Promise<void>((resolve, reject) => {
        if (value === '') {
          reject(Error('请输入密码'))
        }else {
          resolve()
        }
      })
    }
  }
}

watch(
    () => isAgree.value,
    newVal => {
      if (newVal === true) {
        agree.value.style.color = '#808080'
      }
    }
)

const redirect = ref('')

watch(
    () => currentRoute.value,
    (route: RouteLocationNormalizedLoaded) => {
      redirect.value = route?.query?.redirect as string
    },
    {
      immediate: true
    }
)


const notification : any = inject('notification')
const message : any = inject('message')
//登录
const handleLogin = (e: MouseEvent) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (isAgree.value === false) {
      agree.value.style.color = '#D03050'
      return
    }
    const messageReactive = message.loading('登录中...', {
      duration: 0
    })
    if (!errors) {
      login(user).then(async res => {
        messageReactive.destroy()
        const expires = new Date(new Date().getTime() + 30*60*1000)
        await Cookies.set('token', res.data, {expires: expires})
        message.success('登录成功', { duration: 2000 })
        setIsLogin(true)
        redirect.value == undefined ? replace('/') : replace(redirect.value)
      }, rej => {
        message.error(rej, {duration: 2000})
      }).catch(error => {
        messageReactive.destroy()
      })
    }

  })
}

console.log(redirect.value)

/* const getUserInfo = () => {
  getUserInfoApi().then(res => {
    Cookies.set()
  })
} */


</script>

<style scoped lang="scss">
.contain {
  //background-color: #ebeeef;
  display: flex; /*弹性布局*/
  flex-direction: row;
  justify-content: center; /*主轴对齐方式*/
  align-items: center; /*纵轴对齐方式*/
  height: 100vh;
  width: 100vw;
  .n-card {
    position: relative;
    border-radius: 5px;
    .login-form {
      .email-input {
        //width: 68%;
      }
      .send-code {
        width: 25%;
        height: 40px;
        float: right;
        margin-left: 10px;
        text-align: center;
        overflow: hidden;
      }
    }
    .n-button {
      //text-align: center;
      //display: block;
      margin: 0 auto;
      width: 100%;
      .n-button__content {
        display: none;
      }
    }
    .login-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      span {
        font-size: 1.3rem;
        cursor: pointer;
        color: grey;
        &:hover {
          color: skyblue;
        }
      }

    }
  }
}

@media screen and (min-width: 769px) {
  .n-card {
    max-width: 500px;
    margin-bottom: 100px;
  }
}

@media screen and (max-width: 769px) {
  .n-card {
    width: 80%;
    .n-button {
      font-size: 0.8rem;
    }
  }
}

</style>
<style>
.contain .n-card > .n-card__content {
  padding: 0 !important;
}
</style>