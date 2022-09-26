<template>
  <el-form label-width="100px" class="m-5">
    <el-form-item label="角色名称">
      <el-input v-model="data.roleName" disabled />
    </el-form-item>
    <el-form-item label="角色编码">
      <el-input v-model="data.roleCode" disabled />
    </el-form-item>
    <el-form-item label="状态">
      <el-tooltip :content="data.status ? '启用' : '停用'" placement="top">
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
    <el-form-item label="创建时间">
      <el-input v-model="data.created" disabled />
    </el-form-item>
    <el-form-item label="更新时间">
      <el-input v-model="data.updated" disabled />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {roleViewApi} from "@/api/ums/role"
import {ViewReturnType} from "@/types/ums/role"
import {ref, watchEffect} from "vue";

let data = ref<Partial<ViewReturnType>>({
  id: '',
  roleName: '',
  roleCode: '',
  status: -1,
  sort: 1,
  created: '',
  updated: ''
})

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

watchEffect(async () => {
  const result: Result<ViewReturnType> = await roleViewApi(props.id)
  data.value = result.data
})

</script>

<style>

</style>
