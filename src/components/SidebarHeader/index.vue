<template>
  <div class="sidebar-header-container" :style="{width: sidebarStore.sidebarOpenedGetter ? '64px':'200px'}">
    <img alt="" src="../../assets/logo.png">
    <h1 v-show="!sidebarStore.sidebarOpenedGetter">商城后台系统</h1>
  </div>
</template>

<script lang="ts" setup>
import {useSidebarStore} from "@/store/sidebar"

const sidebarStore = useSidebarStore()

</script>

<style scoped lang="scss">
.sidebar-header-container {
  background-color: #334154;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
  }

  h1 {
    margin-left: 10px;
    color: #fff;
    font-weight: bold;
  }
}

</style>
