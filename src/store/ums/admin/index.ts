import { _GettersTree, defineStore } from "pinia";
import {
  ActionType,
  StateType,
} from "@/types/ums/admin";

export const useAdminStore = defineStore<
  string,
  StateType,
  _GettersTree<StateType>,
  ActionType
>("ums/admin", {
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
    async login(value: LoginFormType): Promise<void> {},
    // 退出登录
    async logout(): Promise<void> {},
    // 清除用户缓存数据
    async clear(): Promise<void> {},
    // 获取用户信息
    async profile(): Promise<void> {},
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
