import {_RouteRecordBase, createRouter, createWebHashHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";
import Layout from '@/views/Layout/index.vue'
import {addRoutes, menuList} from "@/utils/menu";

declare module "vue-router" {
    interface RouteMeta {
        // 是可选的
        title: string;
        // 每个路由都必须声明
        icon?: string;
    }
}

// 公开的路由表
const publicRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录页面",
        },
        component: () => import("@/views/Login/index.vue"),
    },
    {
        path: "/",
        name: 'layout',
        component: Layout,
        redirect: {name: 'home'},
        children: [
            {
                path: "home",
                name: "home",
                meta: {
                    title: "首页",
                },
                component: () => import("@/views/Home/index.vue"),
            },
            {
                path: "404",
                name: "404",
                component: () => import("@/views/404/index.vue"),
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: () => {
            return {name: "404"};
        },
    },
];

// 私有的路由表
const privateRoutes: RouteRecordRaw[] = [
    {
        path: "/system",
        component: () => import("@/views/Layout/index.vue"),
        redirect: "/system/user",
        meta: {
            title: "系统设置",
            icon: "",
        },
        children: [
            {
                path: "/system/user",
                name: "user",
                component: () => import("@/views/System/Admin/index.vue"),
                meta: {
                    title: "用户管理",
                    icon: "",
                },
            },
            {
                path: "/system/role",
                name: "role",
                component: () => import("@/views/System/Role/index.vue"),
                meta: {
                    title: "角色管理",
                    icon: "",
                },
            },
            {
                path: "/system/menu",
                name: "menu",
                component: () => import("@/views/System/Menu/index.vue"),
                meta: {
                    title: "菜单管理",
                    icon: "",
                },
            },
            {
                path: "/system/dept",
                name: "dept",
                component: () => import("@/views/System/Dept/index.vue"),
                meta: {
                    title: "部门管理",
                    icon: "",
                },
            },
        ],
    },
];

const asyncRoutes: RouteRecordRaw[] = addRoutes(menuList);

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    // ...privateRoutes publicRoutes
    routes: [...publicRoutes, ...asyncRoutes],
});

console.log(router.getRoutes())

export default router
