<template>
  <el-form
      ref="changePasswordFormRef"
      :model="changePasswordForm"
      :rules="changePasswordRules"
      status-icon
      label-width="100px" class="m-5"
  >
    <el-form-item prop="oldPassword" label="原密码">
      <el-input
          v-model="changePasswordForm.oldPassword"
          clearable
          placeholder="请输入原密码"
          show-password
      />
    </el-form-item>
    <el-form-item prop="newPassword" label="新密码">
      <el-input
          v-model="changePasswordForm.newPassword"
          clearable
          placeholder="请输入新密码"
          show-password
      />
    </el-form-item>
    <el-form-item prop="confirmPassword" label="确认密码">
      <el-input
          v-model="changePasswordForm.confirmPassword"
          clearable
          placeholder="请输入确认密码"
          show-password
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {FormInstance, FormRules} from "element-plus"
import {adminEditApi, changePasswordApi} from "@/api/ums/admin"
import {reactive, ref, unref} from "vue";
import go from 'await-handler-ts'
import {ChangePasswordType} from "@/types/ums/admin";

const changePasswordFormRef = ref<FormInstance>()
const changePasswordForm = reactive<ChangePasswordType>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('确认密码为必填项'))
  } else if (value !== changePasswordForm.newPassword) {
    callback(new Error("新密码和确认密码需要一样~"))
  } else {
    callback()
  }
}

// 验证规则
const changePasswordRules: FormRules = reactive<FormRules>({
  oldPassword: [
    {
      required: true, message: '原密码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  newPassword: [
    {
      required: true, message: '新密码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  confirmPassword: [
    {
      required: true, message: '确认密码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    },
    {
      validator: validateConfirmPassword, trigger: 'blur'
    }
  ],
})


// 提交
const submitForm = async () => {

  const validate = unref(changePasswordFormRef)?.validate();
  if (!validate) {
    return await changePasswordApi(changePasswordForm)
  } else {
    return validate
  }
}

// 重置
const resetForm = () => {
  return changePasswordFormRef.value?.resetFields()
}

defineExpose({
  submitForm,
  resetForm
})
</script>

<style>

</style>
