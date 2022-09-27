<template>
  <router-view v-slot="{Component}">
    <transition name="fade">
      <keep-alive :max="10">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router"
import {watch} from "vue";

const route: RouteLocationNormalizedLoaded = useRoute()

watch(route, (to: RouteLocationNormalizedLoaded) => {
}, {immediate: true})
</script>

<style scoped lang="scss">

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}

.fade-enter-active {
  transition-delay: .3s;
}

</style>
