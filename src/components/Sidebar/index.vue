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
    <SidebarItem v-for="item in menuList" :menu="item" :key="item.id" />
  </el-menu>
</template>

<script setup lang="ts">
import SidebarItem from '@/components/SidebarItem/index.vue'
import SidebarHeader from '@/components/SidebarHeader/index.vue'
import {useRoute} from 'vue-router'
import {useSidebarStore} from "@/store/sidebar"
import {computed, reactive} from "vue";

const sidebarStore = useSidebarStore()

// 测试数据
const menuList = reactive([
  {
    id: '1',
    title: '首页',
    icon: 'i-ep-home-filled',
    path: '/',
    children: []
  },
  {
    id: '2',
    title: '系统设置',
    icon: 'i-ep-menu',
    path: '',
    children: [
      {
        id: '3',
        title: '用户管理',
        icon: 'i-ep-user',
        path: '/system/user',
      },
      {
        id: '6',
        title: '角色管理',
        icon: 'i-ep-user',
        path: '/system/role'
      },
      {
        id: '7',
        title: '菜单管理',
        icon: 'i-ep-user',
        path: '/system/menu'
      },
      {
        id: '81',
        title: '部门管理',
        icon: 'i-ep-user',
        path: '/system/dept'
      },
    ]
  },
  {
    id: '8',
    title: '系统设置1',
    icon: 'i-ep-menu',
    path: '',
    children: [
      {
        id: '9',
        title: '用户管理1',
        icon: 'i-ep-user',
        path: '',
        children: [
          {
            id: '10',
            title: '用户管理11',
            icon: 'i-ep-user',
            path: '/admin11',
          },
          {
            id: '11',
            title: '用户管理21',
            icon: 'i-ep-user',
            path: '/admin21',
          }
        ]
      },
      {
        id: '12',
        title: '角色管理1',
        icon: 'i-ep-user',
        path: '/role1'
      },
      {
        id: '13',
        title: '菜单管理1',
        icon: 'i-ep-user',
        path: '/menu1'
      },
    ]
  }
])
// 测试数据
const activeMenu = computed(() => {
  let {path} = useRoute()
  if (path === '/') {
    path = '/'
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
