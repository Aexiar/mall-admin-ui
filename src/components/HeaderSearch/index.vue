<template>
  <div class="header-search" :class="{show: isShow}">
    <el-icon class="i-ep-search search-icon" @click.stop="onShowClick"></el-icon>
    <el-select
        ref="headerSearchSelectRef"
        v-model="search"
        class="m-2 header-search-select"
        placeholder="search"
        :filterable="true"
        :default-first-option="true"
        :remote-method="querySearch"
        @change="onSelectChange"
        :remote="true">
      <el-option
          v-for="option in searchOptions"
          :key="option.item.path"
          :label="option.item.title"
          :value="option.item.path"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
// 控制 Search 展示
import type {ElSelect} from "element-plus"
// 模糊搜索
import Fuse from 'fuse.js'
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const isShow = ref<boolean>(false)

// 搜索的内容
const search = ref<string>('')
// el-select 实例
const headerSearchSelectRef = ref<InstanceType<typeof ElSelect>>()
const onShowClick = () => {
  isShow.value = !isShow.value
  if (headerSearchSelectRef.value) {
    headerSearchSelectRef.value.focus()
  }
}

// 搜索数据源
type MenuDataType = {
  id: string,
  title: string,
  icon: string,
  path: string,
  children?: MenuDataType[]
}
const menuList: MenuDataType[] = [
  {
    id: '1',
    title: '首页',
    icon: 'i-ep-home-filled',
    path: '/',
    children: []
  },
  {
    id: '2',
    title: '系统设置',
    icon: 'i-ep-menu',
    path: '',
    children: [
      {
        id: '3',
        title: '用户管理',
        icon: 'i-ep-user',
        path: '/system/user',
      },
      {
        id: '6',
        title: '角色管理',
        icon: 'i-ep-user',
        path: '/system/role'
      },
      {
        id: '7',
        title: '菜单管理',
        icon: 'i-ep-user',
        path: '/menu'
      },
    ]
  },
  {
    id: '8',
    title: '系统设置1',
    icon: 'i-ep-menu',
    path: '',
    children: [
      {
        id: '9',
        title: '用户管理1',
        icon: 'i-ep-user',
        path: '',
        children: [
          {
            id: '10',
            title: '用户管理11',
            icon: 'i-ep-user',
            path: '/admin11',
          },
          {
            id: '11',
            title: '用户管理21',
            icon: 'i-ep-user',
            path: '/admin21',
          }
        ]
      },
      {
        id: '12',
        title: '角色管理1',
        icon: 'i-ep-user',
        path: '/role1'
      },
      {
        id: '13',
        title: '菜单管理1',
        icon: 'i-ep-user',
        path: '/menu1'
      },
    ]
  }
]

type FuseDataType = {
  title: string,
  path: string
}
// 处理菜单数据，用于检索
const handleMenuList = (menuList: MenuDataType[]) => {
  // 创建 result 数据
  let result: FuseDataType[] = []
  if (!Array.isArray(menuList) || menuList.length === 0) {
    return result;
  }
  for (let menu of menuList) {
    if (menu.children && menu.children.length > 0) {
      let parentTitle = menu.title;
      const temp: FuseDataType[] = handleMenuList(menu.children)
      temp.map(t => t.title = parentTitle + " -> " + t.title)
      if (temp.length > 0) {
        result = [...result, ...temp]
      }
    } else {
      // 创建包含 path 和 title 的 item
      const data: FuseDataType = {
        path: menu.path,
        title: menu.title
      }
      result.push(data)
    }
  }
  return result;
}

// 搜索库相关
const fuse = new Fuse<FuseDataType>(handleMenuList(menuList), {
  shouldSort: true, // 是否按照优先级进行排序
  minMatchCharLength: 1, // 匹配长度超过某个值的被认为是匹配的
  keys: [ // 将被搜索的键列表，支持嵌套路劲、加权搜索、在字符串和对象数组中搜索
    {
      name: 'title', // 搜索的键
      weight: 0.7 // 权重
    }, {
      name: 'path', // 搜索的键
      weight: 0.3 // 权重
    }
  ]
})

// 搜索的相关逻辑
const searchOptions = ref<Fuse.FuseResult<FuseDataType>[]>([])
const querySearch = (query: string) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 选中回调
const onSelectChange = (path: string) => {
  if (path) {
    router.push(path)
  }
}

// 关闭 search 的处理事件
const onClose = () => {
  if (headerSearchSelectRef.value) {
    headerSearchSelectRef.value.blur()
  }
  isShow.value = false;
  searchOptions.value = []
}

// 监听 search 打开，处理 close 事件
watch(isShow, (val: boolean) => {
  if (val) {
    if (headerSearchSelectRef.value) {
      headerSearchSelectRef.value.focus()
    }
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;

  ::v-deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}

</style>
