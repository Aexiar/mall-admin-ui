<template>
  <SidebarHeader />
  <el-menu
      active-text-color="#409EFF"
      background-color="#334154"
      :default-active="activeMenu"
      router
      :collapse="sidebarStore.sidebarOpened"
      :unique-opened="true"
      :collapse-transition="false"
      text-color="#fff">
    <!-- 首页 -->
    <el-menu-item index="/home">
      <el-icon class="i-ep-home-filled"></el-icon>
      <span>首页</span>
    </el-menu-item>
    <SidebarItem v-for="item in menuList" :menu="item" :key="item.id" />
  </el-menu>
</template>

<script setup lang="ts">
import SidebarItem from '@/components/SidebarItem/index.vue'
import SidebarHeader from '@/components/SidebarHeader/index.vue'
import {useRoute, useRouter} from 'vue-router'
import {useSidebarStore} from "@/store/sidebar"
import {computed, reactive} from "vue";

const sidebarStore = useSidebarStore()

import {menuList} from '@/utils/menu'

// 测试数据
// const menuList = reactive([
//   {
//     id: '2',
//     title: '系统设置',
//     icon: 'i-ep-menu',
//     path: '',
//     children: [
//       {
//         id: '3',
//         title: '用户管理',
//         icon: 'i-ep-user',
//         path: '/system/user',
//       },
//       {
//         id: '6',
//         title: '角色管理',
//         icon: 'i-ep-user',
//         path: '/system/role'
//       },
//       {
//         id: '7',
//         title: '菜单管理',
//         icon: 'i-ep-user',
//         path: '/system/menu'
//       },
//       {
//         id: '81',
//         title: '部门管理',
//         icon: 'i-ep-user',
//         path: '/system/dept'
//       },
//     ]
//   }
// ])
// 测试数据
const activeMenu = computed(() => {
  let {path} = useRoute()
  const { currentRoute } = useRouter()
  if (path === '/') {
    path = '/home'
  }
  return path
})

</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border-right: 0;
  overflow: hidden;
}
</style>
