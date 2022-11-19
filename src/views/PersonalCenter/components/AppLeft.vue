<script setup lang="ts">
import UserInfo from './UserInfo.vue';
import ContentInfo from './ContentInfo.vue';

</script>

<template>
  <div class="home-app-right">
    <transition name="zoom-fade" mode="in-out">
      <div>
        <UserInfo />
        <ContentInfo />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

<style lang="scss">
/* .home-app-right .n-card>.n-card__content:first-child,
.n-card>.n-card__footer:first-child {
  padding-top: 0.1rem;
}
 */
.home-app-right .n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>