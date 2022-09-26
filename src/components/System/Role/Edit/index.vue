<template>
  <el-form
      ref="editFormRef"
      :rules="editFormRules"
      :model="editForm"
      status-icon
      label-width="100px"
      class="m-5">
    <el-form-item label="角色名称" prop="username">
      <el-input v-model="editForm.roleName" />
    </el-form-item>
    <el-form-item label="角色编码" prop="realName">
      <el-input v-model="editForm.roleCode" />
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
    <el-form-item label="排序" prop="sort">
      <el-input-number v-model="editForm.sort" :min="0" placeholder="请输入排序字段" :value-on-clear="editForm.sort" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {roleEditApi} from "@/api/ums/role"
import {EditType, ViewReturnType} from "@/types/ums/role"
import {FormInstance, FormRules} from "element-plus"
import {reactive, ref, unref, watchEffect} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {roleViewApi} from "@/api/ums/role";

const editFormRef = ref<FormInstance>()

const editForm: UnwrapNestedRefs<ViewReturnType | EditType> = reactive<ViewReturnType | EditType>({
  id: '',
  roleName: '',
  roleCode: '',
  status: 1,
  sort: 0
})

// 验证规则
const editFormRules = reactive<FormRules>({
  roleName: [
    {
      required: true, message: '角色名称为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  roleCode: [
    {
      required: true, message: '角色编码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],

})

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

watchEffect(async () => {
  const result: Result<ViewReturnType> = await roleViewApi(props.id)
  Object.assign(editForm, result.data)
})

// 提交
const submitForm = async () => {
  // 进行表单验证，如果表单验证失败，那么 error 就是错误对象信息；如果表单验证成功，那么 error 就是 null
  const validate = await unref(editFormRef)?.validate();
  if (validate) {
    return await roleEditApi(editForm)
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
