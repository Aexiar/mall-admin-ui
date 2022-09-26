<template>
  <el-row>
    <!-- 搜索 -->
    <el-card shadow="hover" style="width: 100%">
      <el-form :model="searchOptions" :inline="true">
        <el-form-item label="角色名称">
          <el-input v-model="searchOptions.roleName" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="searchOptions.roleCode" />
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
      <el-table :data="tableData" style="width: 100%" stripe border table-layout="auto" :highlight-current-row="true"
                :header-cell-style="{background:'#e3e3e7',color:'#515a6d'}">
        <el-table-column type="index" label="#" />
        <el-table-column label="角色名称">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色编码">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.realName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tooltip :content="scope.row.status ? '启用' : '停用'" placement="top">
              <el-switch v-model="scope.row.status" class="ml-2" inline-prompt :active-value="1" :inactive-value="0"
                         style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
              </el-switch>
            </el-tooltip>
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
            <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top">
              <el-button type="success" link icon="i-ep-position" @click="handleAllocRole(scope.$index, scope.row)">
              </el-button>
            </el-tooltip>
            <el-popconfirm :title="`确定删除${scope.row.username}吗？`" @confirm="handleDelete(scope.$index, scope.row)"
                           width="160">
              <template #reference>
                <el-button type="danger" icon="i-ep-delete" link>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination :currentPage="searchOptions.pageNo" :pageSize="searchOptions.pageSize" background small
                     layout="->,total,size,prev,pager,next,jumper" :total="total" :page-sizes="[5, 10, 15, 20]"
                     class="mt-4"
                     @sizeChange="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
  </el-row>
</template>

<script setup lang="tsx">
import {AdminPageReturnType} from "@/types/ums/admin"
import {adminDeleteApi} from "@/api/ums/admin"
import dialogService from '@caroundsky/el-plus-dialog-service'
import AdminView from '@/components/System/Admin/View/index.vue'
import AdminAdd from '@/components/System/Admin/Add/index.vue'
import AdminEdit from '@/components/System/Admin/Edit/index.vue'
import {ElMessage} from "element-plus"
import go from 'await-handler-ts'
import {onMounted, reactive, ref} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {PAGE_NO, PAGE_SIZE} from "@/types/global";
import {RolePageReturnType, RolePageType} from "@/types/ums/role";
import {rolePageListApi} from "@/api/ums/role";

// 搜索条件
const searchOptions: UnwrapNestedRefs<Partial<RolePageType>> = reactive<Partial<RolePageType>>({
  roleName: '',
  roleCode: '',
  status: -1,
  pageNo: PAGE_NO, // 页码
  pageSize: PAGE_SIZE // 每页显示条数
})

// 总条数
const total = ref<number>(0)

// 分页查询数据
const tableData = ref<RolePageReturnType[]>([])

// 分页查询
const paginationQuery = async () => {
  const result: Result<PaginationReturn<RolePageReturnType>> = await rolePageListApi(searchOptions)
  total.value = result.data.total
  tableData.value = result.data.records
}

onMounted(async () => {
  await paginationQuery()
})

// 查询
const handleSearch = async () => {
  await paginationQuery()
}

// 重置
const handleReset = async () => {
  // 查询条件重置
  searchOptions.roleName = ''
  searchOptions.roleCode = ''
  searchOptions.status = -1
  searchOptions.pageNo = PAGE_NO
  searchOptions.pageSize = PAGE_SIZE
  // 分页查询
  await paginationQuery()
}

const handleSizeChange = async (val: number) => {
  searchOptions.pageSize = val
  // 分页查询
  await paginationQuery()
}
const handleCurrentChange: (val: number) => void = async (val) => {
  searchOptions.pageNo = val
  // 分页查询
  await paginationQuery()
}

// 编辑
const handleEdit = (index: number, row: AdminPageReturnType) => {
  dialogService({
    title: '用户编辑',
    height: '60vh',
    width: '50vw',
    content: <AdminEdit id={row.id} />,
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
            // 分页查询
            await paginationQuery()
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
    title: '用户详情',
    height: '60vh',
    width: '50vw',
    content: <AdminView id={row.id} />,
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
    const result: Result = await adminDeleteApi(row.id)
    ElMessage({
      message: result.msg,
      type: 'success',
    })
    // 分页查询
    await paginationQuery()
  } catch (e) {
    console.error(e)
  }
}

// 新增
const handleAdd = () => {
  dialogService({
    title: '添加用户',
    height: '60vh',
    width: '50vw',
    content: <AdminAdd />,
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
            // 分页查询
            await paginationQuery()
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

// 分配角色
const handleAllocRole = (index: number, row: AdminPageReturnType) => {
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
