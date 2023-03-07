<script setup lang='ts'>
import { getUserInfoDetailApi, modifyUserInfoDetailApi } from '@/api/user';
import Cookies from 'js-cookie';
import { UploadFileInfo } from 'naive-ui';

const message: any = inject('message')
const userInfo = ref<any>({})
const uploadUrl = import.meta.env.VITE_BASE_URL_UPLOAD + '/file/upload'
const token = Cookies.get('token')

onMounted(() => {
  getInfo()
})

const getInfo = () => {
  getUserInfoDetailApi().then(res => {
    userInfo.value = res.data
    console.log(res.data);
  })
}

const handleChange = (e: Event) => {
  userInfo.value.sex = parseInt((e.target as HTMLInputElement).value)
}

const saveModify = () => {
  modifyUserInfoDetailApi(userInfo.value).then(res => {
    message.success('修改成功')
    getInfo()
  })
}

//封面上传完成后的回调
const handleFinish = ({
  file,
  event
}: {
  file: UploadFileInfo
  event?: any
}) => {
  // message.success((event?.target as XMLHttpRequest).response)
  //console.log(event.currentTarget);
  userInfo.value.avatar = import.meta.env.VITE_BASE_URL_IMAGE + JSON.parse(event.currentTarget.response).data
}
</script>

<template>
  <div class="profile">
    <div class="font-700 text-20px mb-10">
      个人资料
    </div>
    <div class="flex pl-5">
      <div class="w-560px">
        <n-form ref="formRef" :model="userInfo" label-placement="left" label-width="90" label-align="left">
          <n-form-item path="age" label="用户名">
            <n-input v-model:value="userInfo.username" @keydown.enter.prevent placeholder="填写你的用户名"
              class="light:bg-hex-fafafa" />
          </n-form-item>
          <n-form-item path="nickanme" label="昵称">
            <n-input v-model:value="userInfo.nickname" @keydown.enter.prevent placeholder="填写你的昵称"
              class="light:bg-hex-fafafa" />
          </n-form-item>
          <n-form-item path="sex" label="性别">
            <n-radio-group v-model:value="userInfo.sex" name="radiogroup">
              <n-space>
                <n-radio :checked="userInfo.sex === 1" :value="1" name="boy" @change="handleChange">
                  男
                </n-radio>
                <n-radio :checked="userInfo.sex === 0" :value="0" name="girl" @change="handleChange">
                  女
                </n-radio>
                <n-radio :checked="userInfo.sex === 2" :value="2" name="unknown" @change="handleChange">
                  保密
                </n-radio>
              </n-space>
            </n-radio-group>

          </n-form-item>
          <n-form-item path="age" label="个人介绍">
            <n-input type="textarea" v-model:value="userInfo.profile" @keydown.enter.prevent placeholder="简单介绍一下自己吧"
              class="light:bg-hex-fafafa" />
          </n-form-item>
          <n-form-item label=" ">
            <n-button round type="primary" @click="saveModify">
              保存修改
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div class="pl-30 flex flex-col items-center w-70">
        <n-upload :action="uploadUrl" :show-file-list="false" @finish="handleFinish" :headers="{
          'Authorization': token
        }">
          <n-avatar round :size="90" :src="userInfo.avatar" class="cursor-pointer" />
        </n-upload>
        <div class="text-12px leading-15">我的头像</div>
        <div class="text-gray-400 text-12px leading-10">
          支持 jpg、png、jpeg 格式大小 5M 以内的图片
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>

</style>