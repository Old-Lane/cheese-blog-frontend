<template>
  <n-card class="!p-0 !border-none">
    <div class="w-full h-200px pt-124px bg-red-500" style="background-image: url(src/assets/imgs/banner.jpg)">
      <div class="relative">
        <div class="absolute">
          <div class="flex ml-20px pb-16px items-center" >
            <div class="w-60px h-60px rounded-1/2">
              <img src="src/assets/imgs/lucy.jpg" alt="" class="rounded-1/2">
            </div>
            <div class="ml-22px text-white ">
              <div>
                <span class="text-3xl font-bold">旧巷Zz1</span>
              </div>
              <div class="mt-2 text-xl">
                <!-- <n-input placeholder="编辑个性签名" class="text-white"></n-input> -->
                编辑个性签名
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">

</script>
<style scoped lang="scss">
</style>
<style lang="scss">
.user-center .n-card > .n-card__content {
  padding: 0;
}
</style>