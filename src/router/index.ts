import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // 是可选的
    title: string;
    // 每个路由都必须声明
    icon?: string;
  }
}

// 公开的路由表
const publicRoutes: Array<RouteRecordRaw> = [
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
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "",
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
      return { name: "404" };
    },
  },
];

// 私有的路由表
const privateRoutes: Array<RouteRecordRaw> = [
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

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  // ...privateRoutes
  routes: [...publicRoutes],
});

const menuList = [
  {
    id: "1",
    title: "首页",
    icon: "i-ep-home-filled",
    path: "/",
    children: [],
  },
  {
    id: "2",
    title: "系统设置",
    icon: "i-ep-menu",
    path: "",
    children: [
      {
        id: "3",
        title: "用户管理",
        icon: "i-ep-user",
        path: "/system/user",
      },
      {
        id: "6",
        title: "角色管理",
        icon: "i-ep-user",
        path: "/system/role",
      },
      {
        id: "7",
        title: "菜单管理",
        icon: "i-ep-user",
        path: "/menu",
      },
    ],
  },
  {
    id: "8",
    title: "系统设置1",
    icon: "i-ep-menu",
    path: "",
    children: [
      {
        id: "9",
        title: "用户管理1",
        icon: "i-ep-user",
        path: "",
        children: [
          {
            id: "10",
            title: "用户管理11",
            icon: "i-ep-user",
            path: "/admin11",
          },
          {
            id: "11",
            title: "用户管理21",
            icon: "i-ep-user",
            path: "/admin21",
          },
        ],
      },
      {
        id: "12",
        title: "角色管理1",
        icon: "i-ep-user",
        path: "/role1",
      },
      {
        id: "13",
        title: "菜单管理1",
        icon: "i-ep-user",
        path: "/menu1",
      },
    ],
  },
];

// 动态添加路由
export const addRoutes = (menuList: RouteRecordRaw[]) => {};

// 暴露路由
export default router;
