<template>
  <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="addFormRules"
      status-icon
      label-width="100px" class="m-5"
  >
    <el-form-item label="上级部门" prop="parentId">
      <el-tree-select v-model="addForm.parentId" :data="superiorDeptData"
                      :render-after-expand="false"
                      check-strictly show-checkbox
                      node-key="id"
                      :props="defaultProps"
                      filterable
                      :filter-node-method="filterNodeMethod"
      />
    </el-form-item>
    <el-form-item label="部门名称" prop="deptName">
      <el-input v-model="addForm.deptName" clearable placeholder="请输入部门名称" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-tooltip :content="addForm.status ? '启用' : '禁用'" placement="top">
        <el-switch
            v-model="addForm.status"
            class="ml-2"
            :active-value="1"
            :inactive-value="0"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input-number v-model="addForm.sort" :min="0" placeholder="请输入排序字段" :value-on-clear="0" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {ElForm, FormInstance, FormRules} from 'element-plus'
import {onMounted, reactive, ref, unref} from "vue";
import {AddType} from "@/types/ums/dept";
import {DeptTreeReturnType} from "@/types/ums/dept";
import {deptAddApi, deptListApi} from "@/api/ums/dept";
import {construct} from "@aximario/json-tree";

const addFormRef = ref<FormInstance>()
const addForm = reactive<Partial<AddType>>({
  parentId: '',
  deptName: '',
  status: 1,
  sort: 0
})

// 上级部门
const superiorDeptData = ref<DeptTreeReturnType[]>([])

onMounted(async () => {
  const result: Result<DeptTreeReturnType[]> = await deptListApi({})
  superiorDeptData.value = [{deptName: '顶级部门', id: '0'}, ...construct(result.data, {
    id: 'id',
    pid: 'parentId',
    children: 'children',
  })]

  console.log('上级部门', superiorDeptData.value)
})

const defaultProps = {
  children: 'children',
  label: 'deptName',
}

// 判断 data 中是否包含指定的关键字
const filterNodeMethod = (value: string, data: DeptTreeReturnType) => {
  return data.deptName.includes(value)
}

// 验证规则
const addFormRules = reactive<FormRules>({
  parentId: [
    {
      required: true, message: '上级部门为必填项', trigger: 'change'
    }
  ],
  deptName: [
    {
      required: true, message: '部门名称为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ]
})


// 提交
const submitForm = async () => {
  // 进行表单验证，如果表单验证失败，那么 error 就是错误对象信息；如果表单验证成功，那么 error 就是 null
  const validate = await unref(addFormRef)?.validate();
  console.log('@@', addForm)
  if (validate) {
    return await deptAddApi(addForm)
  }
}

// 重置
const resetForm = () => {
  return addFormRef.value?.resetFields()
}

defineExpose({
  submitForm,
  resetForm
})

</script>

<style scoped lang="scss">

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

