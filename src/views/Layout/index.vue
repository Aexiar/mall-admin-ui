<template>
  <el-container class="layout-container">
    <!-- 左侧侧边栏 -->
    <el-aside width="auto" class="aside">
      <SideBar />
    </el-aside>
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header>
        <Navbar />
      </el-header>
      <!-- 标签页 -->
      <TabsView class="tabs-view" />
      <!-- 内容区 -->
      <el-main class="main">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="tsx">
import SideBar from '@/components/Sidebar/index.vue'
import Navbar from '@/components/Navbar/index.vue'
import AppMain from '@/components/AppMain/index.vue'
import TabsView from '@/components/TabsView/index.vue'

</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;

  .aside {
    overflow: hidden;
    height: 100%;
  }

  .header {
    border-bottom: 1px solid #eee;
  }

  .tabs-view {
    height: 40px;
  }

  .main {
    background-color: #f0f2f5;
  }
}
</style>
