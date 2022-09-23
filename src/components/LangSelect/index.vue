<template>
  <el-tooltip
      class="box-item"
      effect="dark"
      content="国际化"
      placement="bottom"
  >
    <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
      <el-icon class="i-ant-design-global-outlined" :size="20"
               style="cursor: pointer"></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh" >
            中文
          </el-dropdown-item>
          <el-dropdown-item command="en" >
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>

</template>

<script setup lang="ts">
import {ElMessage} from "element-plus"

const handleCommand = (command: string) => {
  // 中文或英文
  if (command === 'zh' || command === 'en') {
    // 设置 store 中保存的 language
    // 切换 i18n 的 locale
    // 提示
    ElMessage.success('切换成功')
  }
}

</script>

<style>

</style>
