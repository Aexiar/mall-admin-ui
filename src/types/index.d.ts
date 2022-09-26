// 接口返回类型
type Result<T = {} | null> = {
    // 状态码
    code: number;
    // 返回数据
    data: T;
    // 提示消息
    msg: string;
    // 时间戳
    timestamp: string;
};

// 对接口返回类型进行 Promise 限定
type PromiseResult<T> = Promise<Result<T>>;

// 分页接口返回的数据类型
type PaginationReturn<T = any> = {
    countId: number | null,
    current: number | null, // 当前页码
    maxLimit: number | null,
    optimizeCountSql: boolean | null,
    pages: number | null,
    searchCount: boolean | null,
    orders: object [] | null,
    size: number | null, // 每页显示条数
    total: number, // 总条数
    records: T[]  // 记录数
}

// 菜单接口的返回值类型
type MenuType = {
    // 主键
    id: string,
    // 菜单的名称
    title: string,
    // 菜单的图标
    icon: string,
    // 路由地址，如果是外链，需要以 https 开头
    path: string,
    // 名称
    name: string,
    // 组件地址
    component: string,
    // 子菜单
    children?: MenuType[]
}
