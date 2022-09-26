import {RouteRecordRaw} from "vue-router";
import router from '@/router'

export const menuList: MenuType[] = [
    {
        id: "2",
        title: "系统设置",
        icon: "i-ep-menu",
        name: 'system',
        path: "",
        component: 'Layout',
        children: [
            {
                id: "3",
                title: "用户管理",
                icon: "i-ep-user",
                name: "user",
                component: '/System/Admin',
                path: "/system/user",
            },
            {
                id: "6",
                title: "角色管理",
                icon: "i-ep-user",
                name: "role",
                component: '/System/Role',
                path: "/system/role",
            },
            {
                id: "7",
                title: "菜单管理",
                icon: "i-ep-user",
                name: "menu",
                component: '/System/Menu',
                path: "/system/menu",
            },
            {
                id: "71",
                title: "部门管理",
                icon: "i-ep-user",
                name: "dept",
                component: '/System/Dept',
                path: "/system/dept",
            },
        ],
    },
    {
        id: "8",
        title: "系统设置1",
        icon: "i-ep-menu",
        path: "",
        name: '',
        component: 'Layout',
        children: [
            {
                id: "9",
                title: "用户管理1",
                icon: "i-ep-user",
                component: '',
                path: "",
                name: '',
                children: [
                    {
                        id: "10",
                        title: "用户管理11",
                        icon: "i-ep-user",
                        path: "/admin11",
                        name: '',
                        component: '',
                    },
                    {
                        id: "11",
                        title: "用户管理21",
                        icon: "i-ep-user",
                        path: "/admin21",
                        component: '',
                        name: '',
                    },
                ],
            },
            {
                id: "12",
                title: "角色管理1",
                icon: "i-ep-user",
                path: "/role1",
                component: '',
                name: '',
            },
            {
                id: "13",
                title: "菜单管理1",
                icon: "i-ep-user",
                path: "/menu1",
                component: '',
                name: '',
            },
        ],
    },
];

// 动态路由，用于根据后端返回的菜单数据生成路由
export const addRoutes = (menuList: MenuType[]) => {
    let result: RouteRecordRaw[] = []
    if (!Array.isArray(menuList) || menuList.length === 0) {
        return result;
    }
    for (let menu of menuList) {
        if (menu.children && menu.children.length > 0) {
            const children: RouteRecordRaw[] = addRoutes(menu.children)
            const data: RouteRecordRaw = {
                path: menu.path,
                name: menu.name,
                meta: {
                    title: menu.title,
                    icon: menu.icon
                },
                component: () => import("../views/" + menu.component + "/index.vue"),
                children
            }
            result.push(data);
        } else {
            // 创建包含 path 和 title 的 item
            const data: RouteRecordRaw = {
                path: menu.path,
                name: menu.name,
                meta: {
                    title: menu.title,
                    icon: menu.icon
                },
                component: () => import("../views/" + menu.component + "/index.vue")
            }
            result.push(data);
        }
    }
    return result;
}

// 添加路由
addRoutes(menuList).forEach(route => router.addRoute(route))

console.log(router.getRoutes())
// 暴露路由

