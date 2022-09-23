<template>
  <el-config-provider :locale="zhCn" :z-index="10000">
    <router-view></router-view>
  </el-config-provider>

</template>

<script lang="ts" setup>
import { ElConfigProvider } from "element-plus"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="scss">

</style>
