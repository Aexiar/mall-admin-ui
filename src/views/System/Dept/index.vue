<template>
  <div>
    <el-row>
      <!-- 搜索 -->
      <el-card shadow="hover" style="width: 100%">
        <el-form :model="searchOptions" :inline="true">
          <el-form-item label="部门名称">
            <el-input v-model="searchOptions.roleName" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchOptions.status">
              <el-option label="全部" :value="-1" />
              <el-option label="停用" :value="0" />
              <el-option label="启用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch" icon="i-ep-search">
              搜索
            </el-button>
            <el-button @click="handleReset" icon="i-ep-refresh-left" color="#f2f3f7">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <el-card shadow="hover" style="width:100%">
        <!-- 新增、导入、导出 -->
        <el-row>
          <el-button @click="handleAdd" icon="i-ep-circle-plus-filled" type="primary">添加</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData"
                  style="width: 100%; margin-bottom: 20px"
                  stripe
                  row-key="id"
                  border
                  table-layout="auto"
                  :highlight-current-row="true"
                  default-expand-all
                  :header-cell-style="{background:'#e3e3e7',color:'#515a6d'}"
                  :tree-props="{ children: 'children' }">
          <el-table-column type="index" label="#" />
          <el-table-column label="部门名称" prop="deptName"></el-table-column>
          <el-table-column label="状态">
            <template #default="scope">
              <el-tooltip :content="scope.row.status ? '启用' : '停用'" placement="top">
                <el-switch v-model="scope.row.status" class="ml-2" inline-prompt :active-value="1" :inactive-value="0"
                           style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
                </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="部门负责人">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.principal }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="排序">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.sort }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.created }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.updated }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" :fixed="'right'" width="150">
            <template #default="scope">
              <el-tooltip class="box-item" effect="dark" content="详情" placement="top">
                <el-button link icon="i-ep-info-filled" @click="handleView(scope.$index, scope.row)">
                </el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
                <el-button link icon="i-ep-edit" @click="handleEdit(scope.$index, scope.row)">
                </el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="分配权限" placement="top">
                <el-button type="success" link icon="i-ep-position"
                           @click="handleAllocResource(scope.$index, scope.row)">
                </el-button>
              </el-tooltip>
              <el-popconfirm :title="`确定删除${scope.row.roleName}吗？`"
                             @confirm="handleDelete(scope.$index, scope.row)"
                             width="160">
                <template #reference>
                  <el-button type="danger" icon="i-ep-delete" link>
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="tsx">
import {AdminPageReturnType} from "@/types/ums/admin"
import {roleDeleteApi} from "@/api/ums/role"
import dialogService from '@caroundsky/el-plus-dialog-service'
import RoleView from '@/components/System/Role/View/index.vue'
import RoleAdd from '@/components/System/Role/Add/index.vue'
import RoleEdit from '@/components/System/Role/Edit/index.vue'
import {ElMessage} from "element-plus"
import go from 'await-handler-ts'
import {onMounted, reactive, ref} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {DeptListType, DeptTreeReturnType} from "@/types/ums/dept";
import {listTreeApi} from "@/api/ums/dept";

// 搜索条件
const searchOptions: UnwrapNestedRefs<Partial<DeptListType>> = reactive<Partial<DeptListType>>({
  deptName: '',
  status: -1,
})


// 部门树查询数据
const tableData = ref<DeptTreeReturnType[]>([])

// 部门树
const treeQuery = async () => {
  const result: Result<DeptTreeReturnType[]> = await listTreeApi(searchOptions)
  tableData.value = result.data
  console.log('@@@', tableData.value)
}

onMounted(async () => {
  await treeQuery()
})

// 查询
const handleSearch = async () => {
  await treeQuery()
}

// 重置
const handleReset = async () => {
  // 查询条件重置
  searchOptions.deptName = ''
  searchOptions.status = -1
  // 查询
  await treeQuery()
}

// 编辑
const handleEdit = (index: number, row: AdminPageReturnType) => {
  dialogService({
    title: '角色编辑',
    height: '50vh',
    width: '40vw',
    content: <RoleEdit id={row.id} />,
    buttons: [
      {
        label: '确定 ',
        type: 'primary',
        onClick: async ({vm, ctx, component}) => {
          let [error, result] = await go<any, Result>(component.submitForm())
          if (!error && result) {
            ElMessage({
              message: result.msg,
              type: 'success',
            })
            // 查询
            await treeQuery()
            vm.hide()
          }
        },
      }
    ],
  })
}

// 详情
const handleView = (index: number, row: AdminPageReturnType) => {
  dialogService({
    title: '角色详情',
    height: '50vh',
    width: '40vw',
    content: <RoleView id={row.id} />,
    buttons: [
      {
        label: '确定 ',
        type: 'primary',
        onClick: ({vm}) => {
          vm.hide()
        },
      },
    ],
  })
}

// 删除
const handleDelete = async (index: number, row: AdminPageReturnType) => {
  try {
    const result: Result = await roleDeleteApi(row.id)
    ElMessage({
      message: result.msg,
      type: 'success',
    })
    // 查询
    await treeQuery()
  } catch (e) {
    console.error(e)
  }
}

// 新增
const handleAdd = () => {
  dialogService({
    title: '添加角色',
    height: '50vh',
    width: '40vw',
    content: <RoleAdd />,
    buttons: [
      {
        label: '确定 ',
        type: 'primary',
        onClick: async ({vm, ctx, component}) => {
          let [error, result] = await go<any, Result>(component.submitForm())
          if (!error && result) {
            ElMessage({
              message: result.msg,
              type: 'success',
            })
            // 查询
            await treeQuery()
            vm.hide()
          }
        }
      },
      {
        label: '重置',
        type: 'primary',
        onClick: ({vm, ctx, component}) => {
          component.resetForm()
        }
      },
    ]
  })
}

// 分配资源（菜单等）
const handleAllocResource = (index: number, row: AdminPageReturnType) => {
  console.log(index)
  console.log(row)
}

</script>

<style lang="scss" scoped>

.el-row {
  margin-bottom: 2.5vh;
}

.el-row:last-child {
  margin-bottom: 0;
}
</style>
