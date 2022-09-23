<template>
    <router-view />
</template>

<script lang="ts" setup>
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router"
import {watch} from "vue";

const route: RouteLocationNormalizedLoaded = useRoute()

watch(route, (to: RouteLocationNormalizedLoaded) => {
}, {immediate: true})
</script>

<style scoped lang="scss">
</style>
