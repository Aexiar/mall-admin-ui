// Store 中的 State 的类型
export type StateType = {
  tokenName: string | null;
  tokenValue: string | null;
  isLogin: boolean | null;
  loginId: string | null;
  loginType: string | null;
  tokenTimeout: number | null;
  sessionTimeout: number | null;
  tokenSessionTimeout: number | null;
  tokenActivityTimeout: number | null;
  loginDevice: string | null;
  tag: string | null;
  resourceCodeList: string[];
  roleCodeList: string[];
  menuList: string[];
  username: string | null;
  avatar: string | null;
  nickName: string | null;
};

// Store 中的 Action 的类型
export interface ActionType {
  // 登录
  login(value: AdminLoginType): Promise<void>;
  // 退出登录
  logout(): void;
  // 清空
  clear(): void;
  // 用户个人信息
  profile(): void;
}

// 登录接口的数据类型
export type AdminLoginType = {
    username: string,
    password: string
};

export type AminLoginReturnType = {
  tokenName: string | null;
  tokenValue: string | null;
  isLogin: boolean | null;
  loginId: string | null;
  loginType: string | null;
  tokenTimeout: number | null;
  sessionTimeout: number | null;
  tokenSessionTimeout: number | null;
  tokenActivityTimeout: number | null;
  loginDevice: string | null;
  tag: string | null;
}
