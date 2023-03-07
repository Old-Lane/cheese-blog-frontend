<script setup lang='ts'>import { followUserApi, unfollowUserApi } from '@/api/follow';
import { useEmitt } from '@/hook/web/useEmitt';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const user = ref<UserCardType>({})
const { currentRoute, push } = useRouter()

useEmitt({
  name: 'getUserInfo',
  callback: (data: any) => {
    user.value = data
  }
})

const followUser = () => {
  if (!Cookies.get('token')) {
    push(`/login?redirect=${currentRoute.value.path}`)
  } else {
    followUserApi(user.value.id!).then(res => {
      if (res.code === 200) {
        user.value.isFollowed = true
      }
    })
  }
}

const UnfollowUser = () => {
  unfollowUserApi(user.value.id!).then(res => {
    if (res.code === 200) {
      user.value.isFollowed = false
    }
  })
}
</script>

<template>
  <div class="user-info">
    <!--个人信息开始-->
    <n-card style="padding: 0">
      <div class="user-info">
        <!-- <div class="user-info-bgi"></div> -->
        <div class="user-info-avatar">
          <img @click="push(`/space/${user.id}`)" :src="user.avatar" alt="" class="cursor-pointer">
        </div>
        <div @click="push(`/space/${user.id}`)" class="user-name">
          <span class="myfont cursor-pointer">{{user.nickname}}</span>
        </div>
        <div class="summary" style="margin: 8px 0; font-size: 14px; color: #97a8e7; letter-spacing: 2px">{{user.profile}}</div>
        <div class="flex w-7/10 justify-between my-0 mx-auto">
          <n-button @click="followUser" v-if="!user.isFollowed" class="w-47/100" color="#97a8e7">关注</n-button>
          <n-button @click="UnfollowUser" v-else class="w-47/100" color="#97a8e7">关注</n-button>
          <n-button  class="w-47/100" ghost color="#97a8e7">私信</n-button>
        </div>
        <div class="user-info-data">
          <div @click="push(`/space/${user.id}`)" class="user-info-data-item cursor-pointer">
            <div class="headline">文章</div>
            <div class="num">{{user.articleCount}}</div>
          </div>
          <div class="user-info-data-item">
            <div class="headline">阅读量</div>
            <div class="num">{{user.viewCount}}</div>
          </div>
          <div class="user-info-data-item">
            <div class="headline">获赞</div>
            <div class="num">{{user.likeCount}}</div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<style lang='scss' scoped>
.user-info {
  text-align: center;

  .user-info-bgi {
    width: 100%;
    height: 100px;
    background-image: url(@/assets/images/user-info-bgi.jpg);
    box-shadow: 0 -20px 10px -3px #fff inset;
    background-size: cover;
    background-position: 50% center;
  }

  .user-info-avatar img {
    margin-top: -50px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto;
  }

  .user-name {
    margin-top: 14px;
    color: #97a8e7;
    font-size: 28px;
    font-weight: 700;
    //width: 230px;
  }

  .user-info-data {
    display: table;
    padding: 0.7rem 0;
    width: 100%;
    margin: 0 auto;
    table-layout: fixed;

    .user-info-data-item {
      display: table-cell;
      text-align: center;
      font-size: 14px;
      color: #97a8e7;
      .headline {
        font-weight: 600;
      }
      .num {
        margin-top: 0.2rem;
      }
    }
  }
}
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>