<template>
  <el-form label-width="100px" class="m-5">
    <!--<el-form-item label="上级部门" prop="parentId">-->
    <!--  <el-tree-select v-model="addForm.parentId" :data="superiorDeptData"-->
    <!--                  :render-after-expand="false"-->
    <!--                  check-strictly show-checkbox-->
    <!--                  node-key="id"-->
    <!--                  :props="defaultProps"-->
    <!--                  filterable-->
    <!--                  :filter-node-method="filterNodeMethod"-->
    <!--  />-->
    <!--</el-form-item>-->
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
import {ViewReturnType} from "@/types/ums/dept"
import {ref, watchEffect} from "vue";
import {deptViewApi} from "@/api/ums/dept";

let data = ref<Partial<ViewReturnType>>({
  parentId: '',
  deptName: '',
  status: 1,
  sort: 0
})

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

watchEffect(async () => {
  const result: Result<ViewReturnType> = await deptViewApi(props.id)
  data.value = result.data
})

</script>

<style>

</style>
