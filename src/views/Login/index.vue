<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="!flex items-center justify-center flex-col bg-img">
            <div class="font-bold text-5xl text-light-50 mb-4 select-none">{{ APP_TITLE }}</div>
            <div class="text-2xl text-light-blue-400 mb-2">
                《基于 Vite + Vue3.x + Element Plus + Windi Css + Pinia 等技术》
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="bg-light-50 !flex items-center justify-center flex-col">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                <!-- logo -->
                <el-row style="text-align: center">
                    <el-col>
                        <el-form-item style="display: inline-block">
                            <img alt="" class="w-20" src="@/assets/logo.png">
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" clearable placeholder="请输入用户名" prefix-icon="i-ep-avatar"
                        style="width: 250px" />
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" clearable placeholder="请输入密码" prefix-icon="i-ep-lock"
                        show-password style="width: 250px" />
                </el-form-item>
                <!-- 同意协议 -->
                <el-form-item prop="agree">
                    <el-checkbox v-model="loginForm.agree">
                        我已阅读并同意用户协议和隐私条款
                    </el-checkbox>
                </el-form-item>
                <!-- 登录 -->
                <el-form-item>
                    <el-button class="w-full" :loading="loading" type="primary" @click="onSubmit()">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
import type {FormInstance, FormRules} from "element-plus"
import {ElMessage} from 'element-plus'
import {useAdminStore} from '@/store/ums/admin'

import go from 'await-handler-ts'
import {onBeforeUnmount, onMounted, reactive, ref, toRefs, UnwrapNestedRefs} from 'vue';

const APP_TITLE = import.meta.env.VITE_APP_TITLE
const router = useRouter()
const adminStore = useAdminStore()

const loginFormRef = ref<FormInstance>()

const state: UnwrapNestedRefs<LoginFormType> = reactive<LoginFormType>({
    loginForm: {
        username: 'admin', // 用户名
        password: '123456', // 密码
        agree: true // 是否同意协议
    }
})

const { loginForm } = toRefs(state)

// 自定义验证规则
const validateAgree = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('同意协议没有选中'))
    } else {
        callback()
    }
}

// 验证规则
const loginRules = reactive<FormRules>({
    username: [
        {
            required: true, message: '用户名为必填项', trigger: 'change'
        },
        {
            min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
        }
    ],
    password: [
        {
            required: true, message: '密码为必填项', trigger: 'change'
        },
        {
            min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
        }
    ],
    agree: [
        {
            validator: validateAgree, trigger: 'change'
        }
    ]
})

// 处理登录
const loading = ref<boolean>(false)

const onSubmit = async () => {
  // 进行表单验证，如果表单验证失败，那么 error 就是错误对象信息；如果表单验证成功，那么 error 就是 null
  if (loginFormRef.value?.validate()) {
    let [error] = await go(loginFormRef.value?.validate())
    // 如果校验成功，进行表单提交
    if (!error) {
      try {
        loading.value = true
        // 触发登录操作
        await adminStore.loginAction({
          ...loginForm.value
        })
        // 提示登录成功
        ElMessage({
          message: '登录成功',
          type: 'success',
          center: true,
          duration: 1000
        })
        loading.value = false
        // 跳转到首页
        await router.push('/home')
      } catch (e) {
        console.error('login', e)
      } finally {
        loading.value = false
      }
    }
  }

}

// 键盘事件
const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        onSubmit()
    }
}

// 钩子函数，添加键盘监听
onMounted(() => {
    document.addEventListener('keyup', onKeyUp)
})

onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})

</script>

<style lang="scss" scoped>
.login-container {
    @apply min-h-screen;

    .bg-img {
        background: url("@/assets/login_bg.jpg") no-repeat;
    }
}
</style>
