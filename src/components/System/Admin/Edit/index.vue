<template>
  <el-form
      ref="editFormRef"
      :rules="editFormRules"
      :model="editForm"
      status-icon
      label-width="100px"
      class="m-5">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="editForm.username" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="editForm.realName" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="editForm.nickName" />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="editForm.gender">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="editForm.phone" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="editForm.email" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-tooltip :content="editForm.status ? '启用' : '禁用'" placement="top">
        <el-switch
            v-model="editForm.status"
            class="ml-2"
            :active-value="1"
            :inactive-value="0"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <el-upload
          class="avatar-uploader"
          :action="baseUrl"
          name="file"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" oncontextmenu="return false;" ondragstart="return false;">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" oncontextmenu="return false;" ondragstart="return false;"
             alt="头像" />
        <div v-else class="avatar-uploader-icon">
          <el-icon :class="['i-ep-plus']"></el-icon>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input-number v-model="editForm.sort" :min="0" placeholder="请输入排序字段" :value-on-clear="editForm.sort" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {adminAddApi, adminEditApi, adminViewApi} from "@/api/ums/admin"
import {EditType, ViewReturnType} from "@/types/ums/admin"
import {ElMessage, FormInstance, FormRules, UploadProps} from "element-plus"
import go from 'await-handler-ts'
import {reactive, ref, unref, watchEffect} from "vue";
import {ReturnCodeEnum} from "@/types/enums";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {EMAIL_REGEXP, PHONE_REGEXP} from "@/types/global";

const baseUrl = import.meta.env.VITE_APP_BASE_URL + '/oss/upload'

const editFormRef = ref<FormInstance>()

const editForm: UnwrapNestedRefs<ViewReturnType | EditType> = reactive<ViewReturnType | EditType>({
  username: '',
  realName: '',
  nickName: '',
  gender: '',
  phone: '',
  email: '',
  status: 1,
  avatar: '',
  sort: 0,
  id: '',
})

// 验证规则
const editFormRules = reactive<FormRules>({
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
  realName: [
    {
      required: true, message: '真实姓名为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  nickName: [
    {
      required: true, message: '昵称为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  phone: [
    {
      required: true, message: '手机号码为必填项', trigger: 'change'
    },
    {
      pattern: PHONE_REGEXP, message: '手机号码格式不正确', trigger: 'change'
    }
  ],
  email: [
    {
      required: true, message: '邮箱为必填项', trigger: 'change'
    },
    {
      pattern: EMAIL_REGEXP,
      message: '邮箱格式不正确',
      trigger: 'change'
    }
  ],
  avatar: [
    {
      required: true, message: '头像为必填项', trigger: 'change'
    },
  ],

})

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

// 上传头像
const imageUrl = ref<string>('')

watchEffect(async () => {
  const result: Result<ViewReturnType> = await adminViewApi(props.id)
  Object.assign(editForm, result.data)
  imageUrl.value = result.data?.avatar
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response
) => {
  const {code, data, msg} = response
  if (code === ReturnCodeEnum.SUCCESS_CODE) {
    imageUrl.value = data.completeAvatarUrl
    editForm.avatar = data.completeAvatarUrl
  } else {
    ElMessage.error(msg)
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片只能是 jpeg 格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像超过2MB!')
    return false
  }
  return true
}

// 提交
const submitForm = async () => {
  // 进行表单验证，如果表单验证失败，那么 error 就是错误对象信息；如果表单验证成功，那么 error 就是 null
  const validate = await unref(editFormRef)?.validate();
  if (validate) {
    return await adminEditApi(editForm)
  }
}

// 重置
const resetForm = () => {
  return editFormRef.value?.resetFields()
}

defineExpose({
  submitForm,
  resetForm
})

</script>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color) !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  position: relative !important;
  overflow: hidden !important;
  transition: var(--el-transition-duration-fast) !important;

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  &:hover {
    border-color: var(--el-color-primary) !important;
  }
}
</style>
