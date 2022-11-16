<script setup lang='ts'>

</script>

<template>
  <div class="user-info">
    <!--个人信息开始-->
    <n-card style="padding: 0">
      <div class="user-info">
        <!-- <div class="user-info-bgi"></div> -->
        <div class="user-info-avatar">
          <img src="@/assets/imgs/lucy.jpg" alt="">
        </div>
        <div class="user-name">
          <span class="myfont">芝士雪豹</span>
        </div>
        <div style="margin: 8px 0; font-size: 14px; color: #97a8e7; letter-spacing: 2px">心之所向，素履以往</div>
        <div class="flex w-7/10 justify-between my-0 mx-auto">
          <n-button class="w-47/100" color="#97a8e7">关注</n-button>
          <n-button class="w-47/100" ghost color="#97a8e7">私信</n-button>
        </div>
        <div class="user-info-data">
          <div class="user-info-data-item">
            <div class="headline">文章</div>
            <div class="num">{{1}}</div>
          </div>
          <div class="user-info-data-item">
            <div class="headline">阅读量</div>
            <div class="num">{{2}}</div>
          </div>
          <div class="user-info-data-item">
            <div class="headline">获赞</div>
            <div class="num">{{3}}</div>
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
</style>