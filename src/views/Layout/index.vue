<template>
  <el-container class="layout-container">
    <!-- 左侧侧边栏 -->
    <el-aside width="auto" class="aside">
      <SideBar />
    </el-aside>
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <Navbar />
      </el-header>
      <!--&lt;!&ndash; tagView &ndash;&gt;-->
      <!--<el-header class="tags-view">-->
      <!--  <TagsView />-->
      <!--</el-header>-->
      <!-- 内容区 -->
      <el-main class="main">
        <AppMain/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="tsx">
import SideBar from '@/components/Sidebar/index.vue'
import Navbar from '@/components/Navbar/index.vue'
import AppMain from '@/components/AppMain/index.vue'

</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;
  transition: all 1s;

  .aside {
    overflow: hidden;
    height: 100%;
  }

  .header {
    border-bottom: 1px solid #eee;
  }

  .tags-view{
    height: 30px;
    padding: 0;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 5px 10px -5px rgba(0, 0, 0, .2);
  }

  .main {
    background-color: #f0f2f5;
  }
}
</style>
