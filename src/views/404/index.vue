<template>
  <el-result
      icon="warning"
      title="404提示"
      sub-title="你找的页面走失了~~">
    <template #extra>
      <el-button type="primary" @click="$router.push('/home')">回到首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">

</script>

<style>

</style>
