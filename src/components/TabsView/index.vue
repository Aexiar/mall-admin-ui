<template>
  <div class="tabs-container">
    <el-tabs
        v-model="activeTab"
        type="card"
        class="tabs"
        @tab-remove="removeTab"
        @tab-change="changeTab"
    >
      <el-tab-pane
          :closable="item.path != '/' && item.path != '/home'"
          v-for="item in tabList"
          :key="item.path"
          :label="item.title"
          :name="item.path">
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script lang="ts" setup>
import {Ref, ref, watch} from 'vue'
import {
  useRoute,
  RouteLocationMatched
} from "vue-router";
import {TabsType} from "@/types/tabsview";

const route = useRoute()

const activeTab = ref(route.path)
const tabList: Ref<TabsType[]> = ref<TabsType[]>([])

// 添加 tag
const addTab = (data: TabsType) => {
  const tag = tabList.value.find(item => item.path == data.path);
  if (!tag) {
    tabList.value.push(data)
  }
}

// tab 改变
const changeTab = (t:any) => {
  console.log(t)
}

// 监视 route 中的 matched 的变化
watch(() => route.matched, (newValue: RouteLocationMatched[]) => {
  const result: RouteLocationMatched[] = newValue.filter(item => item.path !== '' && item.meta.title)
  if (result) {
    result.forEach(item => {
      addTab({
        title: item.meta.title,
        path: item.path
      })
    })
  }
}, {immediate: true})

// 删除 tab
const removeTab = (path: string) => {
  const index = tabList.value.findIndex(item => item.path == path);
  if (-1 !== index) {
    tabList.value.splice(index, 1)
  }
}
</script>
<style scoped lang="scss">
::v-deep(.el-tabs_header) {
  margin-bottom: 0;
}

::v-deep(.el-tabs__nav) {
  border: 0 !important;
}

::v-deep(.el-tabs__item) {
  height: 30px !important;
  line-height: 30px !important;
  border: 0 !important;
  background-color: #0960bd;
  margin: 0 5px !important;
  color: #fff;
  font-size: 14px;
  text-align: center;
}

::v-deep(.is-icon-close) {

}

</style>
