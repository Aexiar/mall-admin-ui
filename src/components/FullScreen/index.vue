<template>
  <el-tooltip
      class="box-item"
      effect="dark"
      content="全屏"
      placement="bottom"
  >
    <el-icon :class="[!isFullscreen ?'i-ant-design-expand-outlined':'i-ant-design-expand-alt-outlined']" :size="20"
             style="cursor: pointer" @click="toggle"></el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
import {onBeforeMount, onMounted, ref} from "vue";
// 是否全屏
const isFullscreen = ref<boolean>(false)
// 触发事件
const toggle = () => {
  screenfull.toggle()
}
// 监听 screenfull 的变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 绑定监听
onMounted(() => {
  screenfull.on('change', change);
})
// 取消监听
onBeforeMount(() => {
  screenfull.off('change', change)
})

</script>

<style>

</style>
