<template>
  <div>
    <el-tabs
        v-model="activeTab"
        type="card"
        class="tabs"
        @tab-remove="removeTab"
        @tab-change="changeTab"
        @tab-click="clickTab"
    >
      <el-tab-pane
          :closable="item.path != '/' && item.path != '/home'"
          v-for="item in tabs"
          :key="item.path"
          :label="item.title"
          :name="item.path">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue'
import {
  useRoute,
  RouteLocationMatched, useRouter
} from "vue-router";
import {useTabsViewStore} from '@/store/tabsview/index'
import {TabPanelName, TabsPaneContext} from "element-plus";
import {storeToRefs} from "pinia";

const route = useRoute()
const router = useRouter()

const tabsViewStore = useTabsViewStore()

const activeTab = ref(route.path)

const {tabs} = storeToRefs(tabsViewStore);

// tab 改变
const changeTab = (pane: TabPanelName) => {
  activeTab.value = pane as string
}

// 点击 tab
const clickTab = (pane: TabsPaneContext, ev: Event) => {
  const result = pane.paneName
  if (result) {
    router.push(result as string)
  }
}

// 监视 route 中的 matched 的变化
watch(() => route.matched, (newValue: RouteLocationMatched[]) => {
  const result: RouteLocationMatched[] = newValue.filter(item => item.path !== '' && item.meta.title)
  if (result) {
    result.forEach(item => {
      tabsViewStore.addTab({
        title: item.meta.title,
        path: item.path
      })
    })
  }
}, {immediate: true})

// 删除 tab
const removeTab = (pane: TabPanelName) => {
  tabsViewStore.removeTab(pane as string)
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
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>
