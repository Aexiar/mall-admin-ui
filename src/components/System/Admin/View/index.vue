<template>
  <el-form label-width="100px" class="m-5">
    <el-form-item label="用户名">
      <el-input v-model="data.username" disabled />
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="data.realName" disabled />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="data.nickName" disabled />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="data.gender" disabled>
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="data.phone" disabled />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="data.email" disabled />
    </el-form-item>
    <el-form-item label="状态">
      <el-tooltip :content="data.status ? '启用' : '禁用'" placement="top">
        <el-switch
            disabled
            v-model="data.status"
            class="ml-2"
            :active-value="1"
            :inactive-value="0"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="头像">
      <el-avatar :size="178"
                 shape="circle"
                 :src="data.avatar"
                 oncontextmenu="return false;" ondragstart="return false;"/>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="data.sort" disabled />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {adminViewApi} from "@/api/ums/admin"
import {ViewReturnType} from "@/types/ums/admin"
import {ref, watchEffect} from "vue";

let data = ref<Partial<ViewReturnType>>({
  username: '',
  realName: '',
  nickName: '',
  gender: '',
  phone: '',
  email: '',
  status: 0,
  avatar: '',
  sort: 0
})

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

watchEffect(async () => {
  const result: Result<ViewReturnType> = await adminViewApi(props.id)
  data.value = result.data
})

</script>

<style>

</style>
