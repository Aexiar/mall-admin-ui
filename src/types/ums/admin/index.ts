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
    username: string ;
    avatar: string ;
    nickName: string ;
};

// Store 中的 Action 的类型
export interface ActionType {
    // 登录
    loginAction(value: AdminLoginType): Promise<void>;

    // 退出登录
    logoutAction(): void;

    // 清空
    clearAction(): void;

    // 用户个人信息
    profileAction(): void;
}

// 登录接口的数据类型
export type AdminLoginType = {
    username: string,
    password: string
};

// 登录接口的返回值类型
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

// 修改密码类型
export type ChangePasswordType = {
    // 原密码
    oldPassword: string,
    // 新密码
    newPassword: string,
    // 确认密码
    confirmPassword?: string
}

// 用户信息的返回值类型
export type ProfileReturnType = {
    username: string,
    avatar: string,
    resourceCodeList: string[],
    roleCodeList: string[],
    nickName: string,
}

// 分页接口的数据类型
export type AdminPageType = {
    // 用户名
    username: string | null,
    // 邮箱
    email: string | null,
    // 手机号码
    phone: string | null,
    // 状态
    status: number,
    // 页码
    pageNo: number,
    // 每页显示条数
    pageSize: number
}

// 分页接口的返回值类型
export type AdminPageReturnType = {
    id: string,
    username: string,
    realName: string,
    nickName: string,
    gender: string,
    phone: string,
    email: string,
    status: number,
    avatar: string,
    sort: number,
    created: string
}

// 查询接口的返回值类型
export type ViewReturnType = {
    id: string,
    username: string,
    realName: string,
    nickName: string,
    gender: string,
    phone: string,
    email: string,
    status: number,
    avatar: string,
    sort: number
}

// 新增接口的数据类型
export type AddType = {
    // 用户名
    username: string,
    // 密码
    password: string,
    // 真实姓名
    realName: string,
    // 昵称
    nickName: string,
    // 性别
    gender: string,
    // 手机号码
    phone: string,
    // 邮箱
    email: string,
    // 状态
    status: number,
    // 头像
    avatar: string,
    // 排序字段
    sort: number
}

// 编辑接口的数据类型
export type EditType = {
// 用户名
    username: string,
    // 密码
    password: string,
    // 真实姓名
    realName: string,
    // 昵称
    nickName: string,
    // 性别
    gender: number,
    // 手机号码
    phone: string,
    // 邮箱
    email: string,
    // 状态
    status: number,
    // 头像
    avatar: string,
    // 排序字段
    sort: number
}

