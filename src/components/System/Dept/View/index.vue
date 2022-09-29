<template>
  <el-form label-width="100px" class="m-5">
    <el-form-item label="上级部门" prop="parentId" v-show="!data.isRoot">
      <el-tree-select v-model="data.parentId" :data="superiorDeptData"
                      :render-after-expand="false"
                      check-strictly show-checkbox
                      node-key="id"
                      :props="defaultProps"
                      filterable
                      :filter-node-method="filterNodeMethod"
                      :disabled="true"
      />
    </el-form-item>
    <el-form-item label="部门名称">
      <el-input v-model="data.deptName" clearable disabled/>
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
    <el-form-item label="排序">
      <el-input v-model="data.sort" disabled />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {DeptTreeReturnType, ViewReturnType} from "@/types/ums/dept"
import {onMounted, ref, watchEffect} from "vue";
import {deptListApi, deptViewApi} from "@/api/ums/dept";
import {construct} from "@aximario/json-tree";

let data = ref<Partial<ViewReturnType>>({
  parentId: '',
  deptName: '',
  status: 1,
  sort: 0,
  isRoot: false
})

interface Props {
  id: string
}

// 上级部门
const superiorDeptData = ref<DeptTreeReturnType[]>([])

onMounted(async () => {
  const result: Result<DeptTreeReturnType[]> = await deptListApi({})
  superiorDeptData.value = [{deptName: '顶级部门', id: '0'},...construct(result.data, {
    id: 'id',
    pid: 'parentId',
    children: 'children',
  })]
})

const defaultProps = {
  children: 'children',
  label: 'deptName',
}

// 判断 data 中是否包含指定的关键字
const filterNodeMethod = (value: string, data: DeptTreeReturnType) => {
  return data.deptName.includes(value)
}

const props = withDefaults(defineProps<Props>(), {})

watchEffect(async () => {
  const result: Result<ViewReturnType> = await deptViewApi(props.id)
  data.value = result.data
})

</script>

<style>

</style>
