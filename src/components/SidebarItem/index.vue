<template>
  <!-- 有子菜单 -->
  <el-sub-menu :index="menu.id" v-if="menu.children && menu.children.length > 0">
    <template #title>
      <el-icon :class="menu.icon"></el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <!-- 循环渲染 -->
    <SidebarItem v-for="item in menu.children" :menu="item" :key="item.id"></SidebarItem>
  </el-sub-menu>
  <!-- 具体菜单项 -->
  <el-menu-item :index="menu.path" v-else>
    <el-icon :class="menu.icon"></el-icon>
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import SidebarItem from '@/components/SidebarItem/index.vue'
defineProps(['menu'])
</script>

<style>

</style>
