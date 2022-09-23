<template>
  <el-row align="middle" style="height: 100%">
    <el-col :span="1">
      <el-icon :size="22" style="cursor: pointer" :class="sidebarStore.sidebarOpenedGetter? 'i-ep-expand': 'i-ep-fold'"
               @click="toggleCollapse"></el-icon>
    </el-col>
    <el-col :span="14">
      <BreadCrumb></BreadCrumb>
    </el-col>
    <el-col :span="4" style="display: flex;justify-content: flex-end">
      <!-- Search -->
      <HeaderSearch />
    </el-col>
    <el-col :span="5" style="display:flex;justify-content: space-evenly;align-items: center">
      <!-- 全屏 -->
      <Fullscreen />
      <!-- 消息提示 -->
      <Badge />
      <!-- 头像 -->
      <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
        <span class="el-dropdown-link"
              style="display: flex;justify-content: center;align-items: center;cursor: pointer">
          <el-avatar :size="25" shape="circle"
                     :src="avatar" oncontextmenu="return false;" ondragstart="return false;" />
          <span style="margin-left: 10px">{{ nickName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="settings">
              <el-icon class="i-ep-setting"></el-icon>
              个人设置
            </el-dropdown-item>
            <el-dropdown-item command="changePassword">
              <el-icon class="i-ep-unlock"></el-icon>
              修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <el-icon class="i-ep-switch-button"></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 语言切换 -->
      <LangSelect />
    </el-col>
  </el-row>

</template>

<script setup lang="tsx">
import {useAdminStore} from "@/store/ums/admin"
import {ElMessage, ElMessageBox} from "element-plus"
import LangSelect from '@/components/LangSelect/index.vue'
import Fullscreen from '@/components/FullScreen/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import Badge from '@/components/Badge/index.vue'
import {useSidebarStore} from "@/store/sidebar"
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import {useRouter} from "vue-router"
import dialogService from '@caroundsky/el-plus-dialog-service'
import ChangePassword from '@/components/ChangePassword/index.vue'
import go from 'await-handler-ts'
import {storeToRefs} from "pinia";

const router = useRouter()
const adminStore = useAdminStore()
const sidebarStore = useSidebarStore()

const {avatar, nickName} = storeToRefs(adminStore)

const toggleCollapse = () => {
  sidebarStore.toggleSidebarOpened()
}

// 修改密码 hooks
// 处理个人设置、修改密码、退出登录等逻辑
const handleCommand = async (command: string) => {
  // 个人设置
  if (command === 'settings') {
    // TODO 个人设置逻辑还没有写
  }
  // 修改密码
  if (command === 'changePassword') {
    dialogService({
      title: '修改密码',
      height: '30vh',
      width: '40vw',
      content: <ChangePassword />,
      buttons: [
        {
          label: '确定 ',
          type: 'primary',
          onClick: async ({vm, ctx, component}) => {
            // 如果表单验证失败： error 就是 null ,result 是 undefined
            // 如果表单验证成功，逻辑正确: error 就是 null ，result 是 json 对象
            // 如果表单验证成功，逻辑失败：error 是错误的 json 对象，result 是 null
            let [error, result] = await go<any, Result>(component.submitForm())
            if (!error && result) {
              ElMessage({
                message: result.msg,
                type: 'success',
              })
              vm.hide()
            }
          },
        },
        {
          label: '重置',
          type: 'primary',
          onClick: ({vm, ctx, component}) => {
            component.resetForm()
          }
        },
      ],
    })
  }
  // 退出登录
  if (command === 'logout') {
    let [error, result] = await go(ElMessageBox.confirm('确认退出登录吗？', '', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      autofocus: false,
    }))
    if (!error && result) {
      // 触发退出登录操作
      await adminStore.logoutAction()
      // 跳转到登录页面
      await router.push('/login')
    }
  }
}


</script>

<style>

</style>
