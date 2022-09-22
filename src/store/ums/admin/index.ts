import {_GettersTree, defineStore} from "pinia";
import {ActionType, AdminLoginType, AminLoginReturnType, StateType,} from "@/types/ums/admin";
import {adminLoginAPI} from "@/api/ums/admin";

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
    async login(value: AdminLoginType): Promise<void> {
      // 登录
      const result:Result<AminLoginReturnType> = await adminLoginAPI(value)
      // 将接口的返回值设置到 store 中
      Object.assign(this.$state,result.data)
    },
    // 退出登录
    logout(): void {
    },
    // 清除用户缓存数据
    clear(): void {
    },
    // 获取用户信息
    profile(): void {
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
