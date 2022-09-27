import {_GettersTree, defineStore} from "pinia";
import {ActionType, AdminLoginType, AminLoginReturnType, ProfileReturnType, StateType,} from "@/types/ums/admin";
import {adminLoginApi, adminLogoutApi, profileApi} from "@/api/ums/admin";
import {useTabsViewStore} from "@/store/tabsview";


export const useAdminStore = defineStore<string,
    StateType,
    _GettersTree<StateType>,
    ActionType>("ums/admin", {
    state: () => {
        return {
            tokenName: "",
            tokenValue: "",
            isLogin: false,
            loginId: "",
            loginType: "",
            tokenTimeout: 0,
            sessionTimeout: 0,
            tokenSessionTimeout: 0,
            tokenActivityTimeout: 0,
            loginDevice: "",
            tag: "",
            resourceCodeList: [],
            roleCodeList: [],
            menuList: [],
            username: "",
            avatar: "",
            nickName: "",
        };
    },
    actions: {
        // 登录
        async loginAction(value: AdminLoginType): Promise<void> {
            // 登录
            const result: Result<AminLoginReturnType> = await adminLoginApi(value)
            // 将接口的返回值设置到 store 中
            Object.assign(this.$state, result.data)
        },
        // 退出登录
        async logoutAction(): Promise<void> {
            await adminLogoutApi()
            // 清空 tabs
            const tabsViewStore = useTabsViewStore()
            tabsViewStore.$reset()
            // 清空登录相关缓存
            this.$reset()
        },
        // 清除用户缓存数据
        clearAction(): void {
            // 清空数据
            this.$reset()
        },
        // 获取用户信息
        async profileAction(): Promise<void> {
            const result: Result<ProfileReturnType> = await profileApi()
            Object.assign(this.$state,result.data)
        },
    },
    getters: {},
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: [
                    "tokenName",
                    "nickName",
                    "tokenValue",
                    "isLogin",
                    "loginId",
                    "loginType",
                    "tokenTimeout",
                    "sessionTimeout",
                    "tokenSessionTimeout",
                    "tokenActivityTimeout",
                    "loginDevice",
                    "resourceCodeList",
                    "roleCodeList",
                    "menuList",
                    "username",
                    "avatar",
                    "tag",
                ],
            },
        ],
    },
});
